"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/**
 * First-load intro, built from the site's own visual language: the same
 * glow-blob background as the Hero (so the reveal reads as a continuation,
 * not a cut to a different app). Letters of the name alternate in from
 * above/below (even index from the top, odd from the bottom), settling
 * near the top of the screen. Then the whole overlay is cut horizontally
 * through its middle — top half up, bottom half down — like a window
 * opening, revealing the matching Hero blobs underneath. Skipped on repeat
 * visits within the session and under reduced-motion.
 */
const NAME = "Pavani D.";

function GlowBlobs() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div
        className="absolute -top-24 -right-20 h-[50vw] w-[50vw] rounded-full opacity-80 blur-[90px]"
        style={{ background: "radial-gradient(circle, #ff4519 0%, transparent 70%)" }}
      />
      <div
        className="absolute top-1/3 -left-24 h-[38vw] w-[38vw] rounded-full opacity-55 blur-[100px]"
        style={{ background: "radial-gradient(circle, #6a0dad 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 right-1/4 h-[32vw] w-[32vw] rounded-full opacity-45 blur-[110px]"
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
  );
}

export default function Preloader() {
  const [show, setShow] = useState(true);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const topRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const taglineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const seen = sessionStorage.getItem("pd-intro-seen");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (seen || reduced) {
      sessionStorage.setItem("pd-intro-seen", "1");
      setShow(false);
      return;
    }

    const root = rootRef.current;
    const top = topRef.current;
    const bottom = bottomRef.current;
    const tagline = taglineRef.current;
    if (!root || !top || !bottom || !tagline) return;

    const chars = root.querySelectorAll<HTMLElement>(".pl-char");

    gsap.set(chars, { yPercent: (i) => (i % 2 === 0 ? -140 : 140), opacity: 0 });
    gsap.set(tagline, { autoAlpha: 0, y: 14 });

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("pd-intro-seen", "1");
        setShow(false);
      },
    });

    tl.to(chars, {
      yPercent: 0,
      opacity: 1,
      duration: 1,
      ease: "expo.out",
      stagger: 0.05,
    });

    tl.to(tagline, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4");

    // The window cuts open: top half slides up, bottom half slides down,
    // revealing the matching blob background underneath.
    tl.to(top, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, "+=0.6");
    tl.to(bottom, { yPercent: 100, duration: 0.9, ease: "expo.inOut" }, "<");

    return () => {
      tl.kill();
    };
  }, []);

  if (!show) return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[100]">
      <div
        ref={topRef}
        className="absolute inset-0 overflow-hidden bg-bg"
        style={{ clipPath: "inset(0 0 50% 0)" }}
      >
        <GlowBlobs />
        <div className="absolute inset-x-0 top-[24%] flex flex-col items-center px-[5vw]">
          <div className="flex flex-wrap justify-center">
            {NAME.split("").map((c, i) => (
              <span key={i} className="overflow-hidden">
                <span className="pl-char inline-block font-display text-[clamp(2.8rem,11vw,8.5rem)] font-semibold leading-[0.95] tracking-tight text-ink">
                  {c === " " ? " " : c}
                </span>
              </span>
            ))}
          </div>
          <div
            ref={taglineRef}
            className="mt-6 text-[12px] uppercase tracking-[0.35em] text-muted"
          >
            AI/ML Engineer — Full-Stack Developer
          </div>
        </div>
      </div>
      <div
        ref={bottomRef}
        className="absolute inset-0 overflow-hidden bg-bg"
        style={{ clipPath: "inset(50% 0 0 0)" }}
      >
        <GlowBlobs />
      </div>
    </div>
  );
}
