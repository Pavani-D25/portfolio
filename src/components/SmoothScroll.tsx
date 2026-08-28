"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

// Heavy, confident deceleration — most of the motion resolves in the first
// third, then eases out slowly, rather than a linear glide to a stop.
export const weightedEase = (t: number) => 1 - Math.pow(1 - t, 4);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const instance = new Lenis({
      duration: 1.3,
      easing: weightedEase,
      wheelMultiplier: 1,
      touchMultiplier: 1.15,
      syncTouch: false,
    });

    instance.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      instance.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    setLenis(instance);

    // Lenis adopts whatever scroll position exists on mount (e.g. a page
    // load that lands on a #hash) without firing its own "scroll" event —
    // ScrollTrigger.update is only wired to that event, so every scrubbed
    // trigger would otherwise sit stuck at stale progress until the user's
    // first manual scroll. Force one sync pass once layout settles.
    requestAnimationFrame(() => ScrollTrigger.refresh());

    if (process.env.NODE_ENV !== "production") {
      (window as unknown as { lenis?: Lenis }).lenis = instance;
      (window as unknown as { ScrollTrigger?: typeof ScrollTrigger }).ScrollTrigger = ScrollTrigger;
      (window as unknown as { gsap?: typeof gsap }).gsap = gsap;
    }

    return () => {
      gsap.ticker.remove(raf);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
