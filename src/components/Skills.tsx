import type { CSSProperties } from "react";
import LabelRow from "./LabelRow";
import Reveal from "./Reveal";
import { skillGroups } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="relative px-[5vw] pt-32 pb-24">
      <LabelRow index="—" label="Skills" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((g, i) => (
          <Reveal key={g.label} delay={i * 0.06}>
            <div
              style={{ "--glow": g.glow } as CSSProperties}
              className="border-beam group relative overflow-hidden rounded-[20px] border border-line bg-panel/40 p-6 transition-all duration-500 hover:-translate-y-1 hover:bg-panel/60"
            >
              <span
                className="text-[11px] font-semibold uppercase tracking-widest"
                style={{ color: "var(--glow)" }}
              >
                {g.label}
              </span>
              <div className="mt-5 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-line px-3 py-1.5 text-[13px] text-muted2 transition-colors duration-300 group-hover:border-[color:var(--glow)]/40"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
