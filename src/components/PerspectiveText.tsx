"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Scroll-driven 3D text: rotates up out of the page, holds flat while
 * centered, then tips away as it leaves. Driven by a single scrubbed
 * timeline (not two competing ScrollTriggers) so the two ends of the
 * motion never fight over the same frame.
 */
export default function PerspectiveText({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wrap = wrapRef.current;
    const text = textRef.current;
    if (!wrap || !text || reduced) return;

    gsap.set(text, { transformPerspective: 800 });
    const tl = gsap.timeline({
      defaults: { ease: "none", duration: 1 },
      scrollTrigger: {
        trigger: wrap,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    tl.fromTo(text, { rotateX: 55, y: 60, opacity: 0.15 }, { rotateX: 0, y: 0, opacity: 1 })
      .to(text, { rotateX: 0, opacity: 1 })
      .to(text, { rotateX: -35, opacity: 0.2 });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div ref={wrapRef} style={{ perspective: 800 }}>
      <div ref={textRef} className={className}>
        {children}
      </div>
    </div>
  );
}
