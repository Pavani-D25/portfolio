"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * One-time fade-and-rise entrance as an element scrolls into view.
 * Distinct from FocusReveal's continuous proximity blur — the two compose
 * cleanly when nested since they animate separate DOM nodes.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 26,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    // A default (non-scrub, non-once) ScrollTrigger only fires its enter
    // callback on a live scroll crossing — if the page loads (or a hash-jump
    // lands) with the element already past "top 85%", the fromTo's initial
    // render state (invisible, offset) can be left showing forever. Check
    // the real DOM position first and skip straight to the settled state.
    if (el.getBoundingClientRect().top <= window.innerHeight * 0.85) {
      gsap.set(el, { autoAlpha: 1, y: 0 });
      return;
    }

    const tween = gsap.fromTo(
      el,
      { autoAlpha: 0, y },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
