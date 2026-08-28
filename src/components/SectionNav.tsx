"use client";

import { useEffect, useState } from "react";
import { useLenis, weightedEase } from "./SmoothScroll";

const sections = [
  { id: "top", label: "Intro" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certs" },
  { id: "contact", label: "Contact" },
];

export default function SectionNav() {
  const lenis = useLenis();
  const [active, setActive] = useState("top");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { duration: 1.3, easing: weightedEase });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-4 lg:flex">
      {sections.map((s) => (
        <button
          key={s.id}
          type="button"
          onClick={() => goTo(s.id)}
          aria-label={`Go to ${s.label}`}
          aria-current={active === s.id}
          className="group pointer-events-auto flex items-center gap-3"
        >
          <span
            className={`text-[11px] uppercase tracking-widest opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
              active === s.id ? "text-accent" : "text-muted"
            }`}
          >
            {s.label}
          </span>
          <span
            className={`h-1.5 w-1.5 rounded-full border transition-all duration-300 ${
              active === s.id ? "scale-125 border-accent bg-accent" : "border-muted bg-transparent"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
