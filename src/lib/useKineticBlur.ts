"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useLenis } from "@/components/SmoothScroll";

/**
 * Drives a subtle blur + skew off live Lenis scroll velocity — fast scroll
 * smears the element like motion blur, settling back to rest the moment
 * scrolling slows. Purely additive: writes filter/transform directly so it
 * composes with whatever else targets the element.
 */
export function useKineticBlur(
  ref: RefObject<HTMLElement | null>,
  { maxBlur = 8, maxSkew = 4 }: { maxBlur?: number; maxSkew?: number } = {}
) {
  const lenis = useLenis();
  const current = useRef(0);
  const target = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || !lenis) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const onScroll = (instance: { velocity: number }) => {
      target.current = Math.min(1, Math.abs(instance.velocity) / 35);
    };
    lenis.on("scroll", onScroll);

    let rafId = requestAnimationFrame(function tick() {
      current.current += (target.current - current.current) * 0.12;
      target.current *= 0.9;
      const t = current.current;
      if (t > 0.01) {
        el.style.filter = `blur(${(t * maxBlur).toFixed(2)}px)`;
        el.style.transform = `skewY(${(t * maxSkew).toFixed(2)}deg)`;
      } else {
        el.style.filter = "";
        el.style.transform = "";
      }
      rafId = requestAnimationFrame(tick);
    });

    return () => {
      lenis.off("scroll", onScroll);
      cancelAnimationFrame(rafId);
      el.style.filter = "";
      el.style.transform = "";
    };
  }, [lenis, ref, maxBlur, maxSkew]);
}
