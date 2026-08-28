"use client";

import { useEffect, useId, useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFocusPull } from "@/lib/focusPull";

/**
 * Section-headline reveal: an irregular, liquid-edged mask (SVG turbulence +
 * displacement) grows once as the headline scrolls into view, so text bleeds
 * into view like ink on paper instead of sliding in behind a hard edge.
 * Also wired into focusPull for continuous depth-of-field as it scrolls.
 */
export default function InkHeadline({
  children,
  as: Tag = "h2",
  className = "",
  maxBlur = 4,
  seed,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  maxBlur?: number;
  seed?: number;
}) {
  const textRef = useRef<HTMLElement | null>(null);
  const rectRef = useRef<SVGRectElement | null>(null);
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const filterId = `ink-filter-${rawId}`;
  const maskId = `ink-mask-${rawId}`;

  useFocusPull(textRef, maxBlur);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = textRef.current;
    const rect = rectRef.current;
    if (!el || !rect) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(rect, { attr: { height: 1.3 } });
      return;
    }

    gsap.set(rect, { attr: { height: 0 } });
    const reveal = () =>
      gsap.to(rect, {
        attr: { height: 1.3 },
        duration: 1.1,
        ease: "power2.out",
      });

    // A discrete ScrollTrigger's onEnter can be missed entirely if the page
    // loads (or a hash-jump lands) with the element already past the "top
    // 90%" point — refresh() re-syncs scrub progress but doesn't reliably
    // replay one-shot callbacks. Check synchronously against the real DOM
    // position first, so an already-visible headline reveals immediately
    // instead of sitting invisible forever.
    if (el.getBoundingClientRect().top <= window.innerHeight * 0.9) {
      reveal();
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: reveal,
    });

    return () => trigger.kill();
  }, []);

  return (
    <>
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <filter
            id={filterId}
            x="-0.3"
            y="-0.6"
            width="1.6"
            height="2.4"
            primitiveUnits="objectBoundingBox"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9 6"
              numOctaves={2}
              seed={seed ?? 7}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={0.35}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <mask id={maskId} maskContentUnits="objectBoundingBox">
            <rect ref={rectRef} x={-0.15} y={-0.15} width={1.3} height={0} fill="#fff" filter={`url(#${filterId})`} />
          </mask>
        </defs>
      </svg>
      <Tag
        ref={textRef}
        className={className}
        style={{ mask: `url(#${maskId})`, WebkitMask: `url(#${maskId})` }}
      >
        {children}
      </Tag>
    </>
  );
}
