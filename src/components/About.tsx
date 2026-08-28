"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LabelRow from "./LabelRow";
import InkHeadline from "./InkHeadline";
import GithubStats from "./GithubStats";
import Parallax from "./Parallax";
import { education, experience } from "@/lib/data";

export default function About() {
  const headingRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const heading = headingRef.current;
    if (!heading || reduced) return;

    gsap.set(heading, { transformPerspective: 900 });
    const tl = gsap.timeline({
      scrollTrigger: { trigger: heading, start: "top 90%", end: "top 40%", scrub: true },
    });
    tl.fromTo(
      heading,
      { scale: 1.2, filter: "blur(14px)", opacity: 0.15 },
      { scale: 1, filter: "blur(0px)", opacity: 1, ease: "none" }
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section id="about" className="relative px-[5vw] pt-44 pb-40">
      <LabelRow index="01" label="About" />
      <div ref={headingRef} className="will-change-transform">
        <InkHeadline
          as="p"
          seed={31}
          className="font-display font-medium text-[clamp(1.8rem,3.8vw,3rem)] leading-[1.3] max-w-[960px] text-ink"
        >
          I&rsquo;m a B.Tech student in AI &amp; Machine Learning who spends most of my time at the
          intersection of computer vision, 3D graphics and full-stack engineering — training
          models, then wrapping them in interfaces people actually want to use.
        </InkHeadline>
      </div>

      <div className="mt-20 grid grid-cols-1 border-t border-line sm:grid-cols-3 [&_strong]:block [&_strong]:text-ink [&_strong]:text-[16px] [&_strong]:mb-2 [&_strong]:font-display [&_strong]:font-semibold">
        <Parallax speed={0.04} className="border-b border-line py-9 pr-8 sm:border-b-0 sm:border-r">
          <span className="text-[12px] uppercase tracking-widest text-accent">Education</span>
          <div className="mt-4 text-[14px] leading-relaxed text-muted2">
            <strong>{education[0].school}</strong>
            {education[0].degree.replace("Artificial Intelligence and Machine Learning", "AI & ML")} · {education[0].detail}
          </div>
        </Parallax>
        <Parallax speed={0.08} className="border-b border-line py-9 sm:border-b-0 sm:border-r sm:px-8">
          <span className="text-[12px] uppercase tracking-widest text-accent">Currently</span>
          <div className="mt-4 text-[14px] leading-relaxed text-muted2">
            <strong>{experience[0].role}</strong>
            {experience[0].org}
          </div>
        </Parallax>
        <Parallax speed={0.12} className="py-9 text-[14px] leading-relaxed text-muted2 sm:pl-8">
          <span className="text-[12px] uppercase tracking-widest text-accent">Open source</span>
          <div className="mt-4">
            <GithubStats />
          </div>
        </Parallax>
      </div>
    </section>
  );
}
