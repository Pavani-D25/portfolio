"use client";

import { useEffect, type RefObject } from "react";

type Tracked = {
  el: HTMLElement;
  maxBlur: number;
};

const tracked = new Map<HTMLElement, Tracked>();
let rafId: number | null = null;
let reducedMotion = false;

if (typeof window !== "undefined") {
  reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Normalized distance from viewport-center (0 at center, 1 at `reach` away)
// maps to blur/contrast/opacity — a camera pulling focus as elements pass
// through the middle of the screen.
function tick() {
  if (tracked.size === 0) {
    rafId = null;
    return;
  }

  const vh = window.innerHeight;
  const center = vh / 2;
  const reach = vh * 0.7;

  // Batch all reads first, then all writes — avoids layout thrashing.
  const reads: Array<{ t: Tracked; rect: DOMRect }> = [];
  tracked.forEach((t) => reads.push({ t, rect: t.el.getBoundingClientRect() }));

  for (const { t, rect } of reads) {
    if (rect.bottom < -vh || rect.top > vh * 2) continue; // far offscreen, skip write

    const elCenter = rect.top + rect.height / 2;
    const norm = Math.min(1, Math.abs(elCenter - center) / reach);
    const blur = t.maxBlur * norm;
    const contrast = 100 - 14 * norm;
    const opacity = 1 - 0.45 * norm;

    t.el.style.filter = `blur(${blur.toFixed(2)}px) contrast(${contrast.toFixed(1)}%)`;
    t.el.style.opacity = opacity.toFixed(3);
  }

  rafId = requestAnimationFrame(tick);
}

export function registerFocusPull(el: HTMLElement, opts: { maxBlur?: number } = {}) {
  if (reducedMotion) {
    el.style.filter = "none";
    el.style.opacity = "1";
    return () => {};
  }

  el.style.willChange = "filter, opacity";
  tracked.set(el, { el, maxBlur: opts.maxBlur ?? 5 });
  if (rafId === null) rafId = requestAnimationFrame(tick);

  return () => {
    tracked.delete(el);
    el.style.filter = "";
    el.style.opacity = "";
    el.style.willChange = "";
    if (tracked.size === 0 && rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };
}

export function useFocusPull(ref: RefObject<HTMLElement | null>, maxBlur?: number) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return registerFocusPull(el, { maxBlur });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, maxBlur]);
}
