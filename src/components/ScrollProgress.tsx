"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useLenis } from "./SmoothScroll";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const lenis = useLenis();

  useEffect(() => {
    const bar = barRef.current;
    const glow = glowRef.current;
    if (!lenis || !bar || !glow) return;

    const setScale = gsap.quickTo(bar, "scaleX", { duration: 0.2, ease: "power2.out" });
    const setGlow = gsap.quickTo(glow, "left", { duration: 0.2, ease: "power2.out", unit: "%" });
    const onScroll = (instance: { progress: number }) => {
      setScale(instance.progress);
      setGlow(instance.progress * 100);
    };

    lenis.on("scroll", onScroll);
    return () => {
      lenis.off("scroll", onScroll);
    };
  }, [lenis]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-line/30">
      <div
        ref={barRef}
        className="h-full origin-left bg-gradient-to-r from-accent to-accent2"
        style={{ transform: "scaleX(0)" }}
      />
      <div
        ref={glowRef}
        className="absolute top-1/2 h-[10px] w-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_12px_3px_rgba(255,69,25,0.7)]"
        style={{ left: "0%" }}
      />
    </div>
  );
}
