import Link from "next/link";
import RollText from "./RollText";
import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line px-[5vw] pt-16 pb-8">
      <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
        <Link
          href="/#top"
          data-cursor-big
          className="group font-display text-[clamp(2.6rem,7vw,5.2rem)] font-bold leading-none tracking-tight text-ink transition-colors duration-300 hover:text-accent"
        >
          <RollText text="Pavani D." />
        </Link>
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-[13px] uppercase tracking-widest text-muted">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-big
            className="transition-colors duration-300 hover:text-accent"
          >
            LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-big
            className="transition-colors duration-300 hover:text-accent"
          >
            GitHub
          </a>
          <a
            href={`mailto:${profile.email}`}
            data-cursor-big
            className="transition-colors duration-300 hover:text-accent"
          >
            Email
          </a>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-[12px] tracking-wide text-muted sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
        <span>Built with Next.js, GSAP &amp; Lenis</span>
      </div>
    </footer>
  );
}
