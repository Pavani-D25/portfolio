"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { CSSProperties, RefObject } from "react";
import LabelRow from "./LabelRow";
import Meteors from "./Meteors";
import { projects } from "@/lib/data";

// Stacked sticky cards: each panel pins in place and recedes (scale + dim)
// as the next one scrolls over it — a pure position:sticky stack driven
// by a per-card GSAP ScrollTrigger for the shrink/fade.
function StackCard({ p, index }: { p: (typeof projects)[number]; index: number }) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const flashRef = useRef<HTMLSpanElement | null>(null);
  const whiteFlashRef = useRef<HTMLSpanElement | null>(null);
  const ghostNumRef = useRef<HTMLSpanElement | null>(null);
  const metaRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const card = cardRef.current;
    const wrap = wrapRef.current;
    const title = titleRef.current;
    const flash = flashRef.current;
    const whiteFlash = whiteFlashRef.current;
    const ghostNum = ghostNumRef.current;
    const meta = metaRef.current;
    const footer = footerRef.current;
    if (!card || !wrap || reduced) return;

    gsap.set(card, { transformPerspective: 1000, transformOrigin: "top center" });

    const isLast = index === projects.length - 1;
    const timelines: gsap.core.Timeline[] = [];

    // Entrance: scrubbed across the card's approach from below the fold up
    // to the pin point, so it always finishes resolving well before the
    // card is actually pinned in place — never visible mid-flash.
    if (title && flash && whiteFlash && meta && footer) {
      const enterTl = gsap.timeline({
        scrollTrigger: { trigger: wrap, start: "top 95%", end: "top 8vh", scrub: true },
      });
      enterTl
        .fromTo(whiteFlash, { opacity: 0.85 }, { opacity: 0, ease: "none", duration: 0.1 }, 0)
        .fromTo(flash, { opacity: 1, scale: 0.2 }, { opacity: 0, scale: 2.4, ease: "none", duration: 0.22 }, 0)
        .fromTo(
          title,
          { filter: "blur(10px)", opacity: 0, scale: 1.15 },
          { filter: "blur(0px)", opacity: 1, scale: 1, ease: "none", duration: 0.22 },
          0
        )
        .fromTo(meta, { opacity: 0, y: -16 }, { opacity: 1, y: 0, ease: "none", duration: 0.22 }, 0.04)
        .fromTo(footer, { opacity: 0, y: 20 }, { opacity: 1, y: 0, ease: "none", duration: 0.22 }, 0.08);
      timelines.push(enterTl);
    }

    // Recede: as the next card scrolls over this one, it tips back into
    // depth, dims, desaturates and softens — falling into the past — while
    // its ghost numeral zooms past behind it.
    if (!isLast) {
      const recedeTl = gsap.timeline({
        scrollTrigger: { trigger: wrap, start: "top 8vh", end: "bottom 8vh", scrub: true },
      });
      recedeTl.to(
        card,
        { scale: 0.8, rotateX: -10, y: -30, filter: "brightness(0.4) blur(3px) grayscale(0.7)", ease: "none" },
        0
      );
      if (ghostNum) {
        recedeTl.to(ghostNum, { scale: 1.6, opacity: 0, ease: "none" }, 0);
      }
      timelines.push(recedeTl);
    }

    return () => {
      timelines.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, [index]);

  return (
    <div ref={wrapRef} className="relative h-[92vh] sm:h-[85vh]">
      <div
        ref={cardRef}
        style={{ "--glow": p.glow, zIndex: index } as CSSProperties}
        className="border-beam sticky top-[8vh] flex h-[78vh] flex-col justify-between overflow-hidden rounded-[28px] border border-line bg-panel/50 p-8 will-change-transform sm:h-[70vh] sm:p-14"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(60% 55% at 85% 15%, color-mix(in srgb, var(--glow) 22%, transparent) 0%, transparent 70%)`,
          }}
        />
        <span
          ref={ghostNumRef}
          aria-hidden
          className="pointer-events-none absolute -bottom-[6%] -right-[2%] select-none font-display text-[38vh] font-bold leading-none text-ink/[0.05]"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          ref={flashRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0"
          style={{
            background: `radial-gradient(45% 45% at 50% 40%, color-mix(in srgb, var(--glow) 55%, transparent) 0%, transparent 70%)`,
          }}
        />
        <span
          ref={whiteFlashRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-ink opacity-0"
        />
        <Meteors seed={p.slug} count={4} />

        <div ref={metaRef} className="relative flex items-start justify-between">
          <span className="font-mono text-[14px] text-muted">
            {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
          <span className="rounded-full border border-line px-3 py-1 text-[11px] uppercase tracking-widest text-muted">
            {p.category}
          </span>
        </div>

        <div className="relative">
          <h3
            ref={titleRef}
            className="font-display font-semibold leading-[0.98] tracking-tight text-ink transition-colors duration-500"
            style={{ fontSize: "clamp(2.4rem, 7vw, 6rem)" }}
          >
            {p.name}
          </h3>
          <p className="mt-5 max-w-[56ch] text-[16px] leading-relaxed text-muted2 sm:text-[18px]">
            {p.tagline}
          </p>
        </div>

        <div ref={footerRef} className="relative flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-line px-3 py-1 text-[12px] text-muted"
              >
                {s}
              </span>
            ))}
          </div>
          <Link
            href={`/work/${p.slug}`}
            data-cursor-big
            className="inline-flex shrink-0 items-center gap-2 text-[15px] font-medium text-ink transition-colors duration-300 hover:text-[color:var(--glow)]"
          >
            View case study <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Mood lighting: a soft glow pinned behind the card stack that shifts to
// whichever project's color is currently active — the whole section's
// lighting changes as you move through it, like a stage cue per act. Driven
// by a single master ScrollTrigger (not one per card) so there's only ever
// one source of truth for "which project is active" — independent per-card
// tweens fighting over the same shared property don't compose correctly.
function AmbientLight({ containerRef }: { containerRef: RefObject<HTMLDivElement | null> }) {
  const ambientRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ambient = ambientRef.current;
    const container = containerRef.current;
    if (!ambient || !container || reduced) return;

    let activeIndex = 0;
    const st = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const idx = gsap.utils.clamp(0, projects.length - 1, Math.floor(self.progress * projects.length));
        if (idx === activeIndex) return;
        activeIndex = idx;
        // A registered @property (see globals.css) makes this a genuine
        // color transition rather than a discrete jump — GSAP doesn't
        // reliably tween unregistered custom properties, so this is driven
        // by native CSS instead.
        ambient.style.setProperty("--ambient", projects[idx].glow);
      },
    });

    return () => st.kill();
  }, [containerRef]);

  return (
    <div className="pointer-events-none sticky top-0 -z-10 h-screen" style={{ marginBottom: "-100vh" }}>
      <div
        ref={ambientRef}
        className="absolute inset-0"
        style={
          {
            "--ambient": projects[0].glow,
            transition: "--ambient 0.6s ease",
            background:
              "radial-gradient(50% 45% at 50% 30%, color-mix(in srgb, var(--ambient) 30%, transparent) 0%, transparent 75%)",
          } as CSSProperties
        }
      />
    </div>
  );
}

export default function Work() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <section id="work" className="relative overflow-hidden px-[5vw] pt-36 pb-16">
      <LabelRow index="02" label="Selected work" />
      <div ref={containerRef}>
        <AmbientLight containerRef={containerRef} />
        {projects.map((p, i) => (
          <StackCard key={p.slug} p={p} index={i} />
        ))}
      </div>
    </section>
  );
}
