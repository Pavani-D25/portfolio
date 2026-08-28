"use client";

import { useRef } from "react";
import { skillsFlat } from "@/lib/data";
import Parallax from "./Parallax";
import { useKineticBlur } from "@/lib/useKineticBlur";

export default function Marquee() {
  const items = [...skillsFlat, ...skillsFlat];
  const trackRef = useRef<HTMLDivElement | null>(null);
  useKineticBlur(trackRef, { maxBlur: 5, maxSkew: 2.5 });

  return (
    <Parallax speed={0.06} className="border-y border-line py-14 overflow-hidden whitespace-nowrap">
      <div ref={trackRef} className="marquee-track">
        {items.map((s, i) => (
          <span
            key={i}
            className={`font-display font-semibold text-[clamp(1.6rem,4vw,2.6rem)] ${
              i % 2 === 0 ? "text-muted" : "text-accent"
            }`}
          >
            {s}
          </span>
        ))}
      </div>
    </Parallax>
  );
}
