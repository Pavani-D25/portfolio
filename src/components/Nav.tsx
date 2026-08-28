"use client";

import { useEffect, useState } from "react";
import { useLenis, weightedEase } from "./SmoothScroll";
import RollText from "./RollText";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!lenis) return;
    const onScroll = (instance: { scroll: number }) => setScrolled(instance.scroll > 60);
    onScroll({ scroll: lenis.scroll });
    lenis.on("scroll", onScroll);
    return () => {
      lenis.off("scroll", onScroll);
    };
  }, [lenis]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const hashIndex = href.indexOf("#");
    if (hashIndex === -1) return;
    const onHome = window.location.pathname === "/";
    if (!lenis || !onHome) return;

    const target = document.querySelector(href.slice(hashIndex));
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target as HTMLElement, { duration: 1.4, easing: weightedEase });
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between border-b text-[14px] transition-all duration-500 ${
        scrolled
          ? "border-line bg-bg/95 px-[5vw] py-3 shadow-[0_10px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl"
          : "border-transparent bg-bg/80 px-[5vw] py-5 backdrop-blur-md"
      }`}
    >
      <a
        href="/"
        onClick={(e) => handleClick(e, "/#top")}
        className="font-display font-semibold text-ink tracking-tight"
      >
        Pavani D.
      </a>
      <div className="hidden sm:flex gap-8">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={(e) => handleClick(e, l.href)}
            className="group text-muted2 hover:text-accent transition-colors duration-300"
          >
            <RollText text={l.label} />
          </a>
        ))}
      </div>
      <a
        href="/#contact"
        onClick={(e) => handleClick(e, "/#contact")}
        className="group rounded-full bg-accent px-5 py-2.5 text-[14px] font-semibold text-bg hover:bg-ink transition-colors duration-300"
      >
        <RollText text="Get in touch" />
      </a>
    </nav>
  );
}
