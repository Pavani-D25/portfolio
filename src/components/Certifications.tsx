import LabelRow from "./LabelRow";
import ScrollPerspectiveItem from "./ScrollPerspectiveItem";
import { certifications } from "@/lib/data";

export default function Certifications() {
  return (
    <section id="certifications" className="relative px-[5vw] pt-32 pb-32">
      <LabelRow index="04" label="Certifications" />
      <div className="divide-y divide-line border-y border-line">
        {certifications.map((c) => (
          <ScrollPerspectiveItem key={c.id}>
            <div className="flex flex-col gap-2 py-7 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <div>
                <div className="font-display text-[19px] font-semibold text-ink">{c.name}</div>
                <div className="mt-1.5 text-[13.5px] text-muted2">
                  {c.issuer} <span className="text-muted">· {c.period}</span>
                </div>
                <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-muted">{c.detail}</p>
              </div>
              <div className="shrink-0 font-mono text-[11px] tracking-wide text-muted">{c.id}</div>
            </div>
          </ScrollPerspectiveItem>
        ))}
      </div>
    </section>
  );
}
