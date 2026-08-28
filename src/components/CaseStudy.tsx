"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import InkHeadline from "./InkHeadline";
import Meteors from "./Meteors";
import type { Project } from "@/lib/data";
import type { CSSProperties } from "react";

export default function CaseStudy({
  project,
  index,
  next,
}: {
  project: Project;
  index: number;
  next: Project;
}) {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const metaRef = useRef<HTMLSpanElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const flashRef = useRef<HTMLDivElement | null>(null);
  const whiteFlashRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const title = titleRef.current;
    const meta = metaRef.current;
    const body = bodyRef.current;
    const flash = flashRef.current;
    const whiteFlash = whiteFlashRef.current;
    if (!title || !meta || !body || !flash || !whiteFlash) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    gsap.set(title, { filter: "blur(18px)", opacity: 0, scale: 1.15 });
    gsap.set([meta, body], { opacity: 0, y: 24 });

    const tl = gsap.timeline({ delay: 0.1 });
    tl.fromTo(whiteFlash, { opacity: 0.8 }, { opacity: 0, duration: 0.35, ease: "power2.out" }, 0)
      .fromTo(flash, { opacity: 1, scale: 0.3 }, { opacity: 0, scale: 2.2, duration: 1, ease: "power2.out" }, 0.03)
      .to(title, { filter: "blur(0px)", opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.5)" }, 0.05)
      .to(meta, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 0.15)
      .to(body, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0.25);

    return () => {
      tl.kill();
    };
  }, []);

  const hasDemo = Boolean(project.demoUrl && project.demoUrl !== "#");

  return (
    <article
      style={{ "--glow": project.glow } as CSSProperties}
      className="relative overflow-hidden px-[5vw] pt-40 pb-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(50% 42% at 18% 22%, ${project.glow}26 0%, transparent 72%)`,
        }}
      />
      <div ref={flashRef} aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-0" style={{
        background: `radial-gradient(45% 40% at 20% 25%, color-mix(in srgb, var(--glow) 60%, transparent) 0%, transparent 70%)`,
      }} />
      <div ref={whiteFlashRef} aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-ink opacity-0" />
      <Meteors seed={project.slug} count={5} />

      <span
        aria-hidden
        className="pointer-events-none absolute -top-4 right-[2vw] select-none font-display text-[26vw] font-bold leading-none text-ink/[0.035] sm:text-[18vw]"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <Link
        href="/#work"
        data-cursor-big
        className="relative inline-flex items-center gap-2 text-[13px] text-muted transition-colors duration-300 hover:text-accent"
      >
        ← Back to work
      </Link>

      <div className="relative mt-10 max-w-[760px]">
        <span ref={metaRef} className="inline-block text-[12px] uppercase tracking-widest text-muted">
          {project.category}
          {project.period ? ` · ${project.period}` : ""}
        </span>

        <h1
          ref={titleRef}
          className="mt-5 font-display text-[clamp(2.6rem,7vw,6rem)] font-semibold leading-[0.98] tracking-tight text-ink will-change-transform"
        >
          <InkHeadline as="span" seed={index * 5 + 2} className="block">
            {project.name}
          </InkHeadline>
        </h1>

        <div ref={bodyRef}>
          <p className="mt-6 max-w-[600px] text-[18px] leading-relaxed text-muted2">
            {project.tagline}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-line px-3 py-1 text-[11px] uppercase tracking-wide text-muted"
              >
                {s}
              </span>
            ))}
          </div>

          {hasDemo && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-big
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-[14px] font-semibold text-bg transition-colors duration-300 hover:bg-ink"
            >
              View live demo ↗
            </a>
          )}

          <div className="mt-16 border-t border-line pt-10">
            <h2 className="text-[12px] uppercase tracking-widest text-muted">Highlights</h2>
            <ul className="mt-6 space-y-4">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-4 text-[15.5px] leading-relaxed text-muted2">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: project.glow }}
                  />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-12 max-w-[640px] text-[15px] leading-relaxed text-muted">
            {project.description}
          </p>
        </div>
      </div>

      <Link
        href={`/work/${next.slug}`}
        data-cursor-big
        className="group relative mt-28 flex items-baseline justify-between border-t border-line pt-10"
      >
        <span className="text-[12px] uppercase tracking-widest text-muted">Next project</span>
        <span className="font-display text-[clamp(1.6rem,4vw,2.8rem)] font-semibold text-ink transition-colors duration-500 group-hover:text-accent">
          {next.name} →
        </span>
      </Link>
    </article>
  );
}
