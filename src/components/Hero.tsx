"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InkHeadline from "./InkHeadline";
import { useKineticBlur } from "@/lib/useKineticBlur";

export default function Hero() {
  const blob1 = useRef<HTMLDivElement | null>(null);
  const blob2 = useRef<HTMLDivElement | null>(null);
  const blob3 = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  useKineticBlur(headlineRef, { maxBlur: 7, maxSkew: 3.5 });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const layers: Array<[HTMLDivElement | null, number]> = [
        [blob1.current, 0.35],
        [blob2.current, 0.6],
        [blob3.current, 0.22],
      ];
      layers.forEach(([el, speed]) => {
        if (!el) return;
        gsap.to(el, {
          yPercent: 30 * speed * 3,
          ease: "none",
          scrollTrigger: {
            trigger: el.closest("section"),
            start: "top top",
            end: "bottom top",
            scrub: 1.1,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="top" className="relative min-h-screen flex flex-col justify-center px-[5vw] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          ref={blob1}
          className="absolute -top-24 -right-20 w-[50vw] h-[50vw] rounded-full opacity-80 blur-[90px]"
          style={{ background: "radial-gradient(circle, #ff4519 0%, transparent 70%)" }}
        />
        <div
          ref={blob2}
          className="absolute top-1/3 -left-24 w-[38vw] h-[38vw] rounded-full opacity-55 blur-[100px]"
          style={{ background: "radial-gradient(circle, #6a0dad 0%, transparent 70%)" }}
        />
        <div
          ref={blob3}
          className="absolute bottom-0 right-1/4 w-[32vw] h-[32vw] rounded-full opacity-45 blur-[110px]"
          style={{ background: "radial-gradient(circle, #1fb6a4 0%, transparent 70%)" }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 50% 45%, transparent 45%, rgba(10,10,10,0.75) 100%)",
          }}
        />
      </div>

      <div className="flex items-center gap-3 mb-4">
        <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_3px_rgba(255,69,25,0.55)]" />
        <span className="text-[13px] tracking-wider uppercase text-muted">
          AI/ML Engineer — Full-stack Developer — Ooty, India
        </span>
      </div>

      <h1
        ref={headlineRef}
        className="font-display font-semibold text-[clamp(3.8rem,12.5vw,13rem)] leading-[0.9] tracking-tight text-ink will-change-transform"
      >
        <InkHeadline as="span" className="block" seed={3}>
          Pavani <span className="text-accent">D.</span>
        </InkHeadline>
      </h1>

      <div className="font-display text-[clamp(1.4rem,2.6vw,2.2rem)] font-medium leading-tight text-ink/80 mt-3">
        Turning data into intelligent products.
      </div>

      <p className="max-w-[480px] mt-9 text-[17px] leading-relaxed text-muted2">
        I build machine learning pipelines and full-stack applications — training models on
        messy real-world data, then shipping them as products people actually use.
      </p>

      <div className="absolute bottom-12 left-[5vw] text-[12px] tracking-widest text-muted flex items-center gap-2.5">
        <span className="w-10 h-px bg-muted overflow-hidden inline-block">
          <i className="scrollline" />
        </span>
        SCROLL
      </div>
    </section>
  );
}
