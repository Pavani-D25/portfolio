import LabelRow from "./LabelRow";
import Reveal from "./Reveal";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="relative px-[5vw] pt-24 pb-36">
      <div className="mt-20">
        <LabelRow index="03" label="Experience" />
      </div>

      <div className="relative border-l border-line pl-8 sm:pl-14">
        {experience.map((job, i) => (
          <Reveal key={job.org} delay={i * 0.1} y={40} className="relative pb-16 last:pb-0">
            <span className="absolute -left-[39px] top-2 h-2.5 w-2.5 rounded-full bg-accent sm:-left-[63px]">
              <span className="absolute inset-0 rounded-full bg-accent" style={{ animation: "beacon-ping 2.4s ease-out infinite", animationDelay: `${i * 0.4}s` }} />
            </span>
            <div className="font-mono text-[13px] tracking-wide text-muted">{job.period}</div>
            <h3 className="mt-3 font-display text-[clamp(1.6rem,3.2vw,2.6rem)] font-semibold leading-tight text-ink">
              {job.role}
            </h3>
            <div className="mt-2 text-[15px] font-medium text-accent">
              {job.org} <span className="text-muted">· {job.location}</span>
            </div>
            <p className="mt-4 max-w-2xl text-[14.5px] leading-relaxed text-muted2">
              {job.description}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
