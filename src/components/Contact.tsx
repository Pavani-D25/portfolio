"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InkHeadline from "./InkHeadline";
import FocusReveal from "./FocusReveal";
import Reveal from "./Reveal";
import LabelRow from "./LabelRow";
import { profile } from "@/lib/data";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const heading = headingRef.current;
    const section = sectionRef.current;
    if (!heading || !section || reduced) return;

    gsap.set(heading, { transformPerspective: 900 });
    const tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: "top 90%", end: "top 30%", scrub: true },
    });
    tl.fromTo(
      heading,
      { scale: 1.3, filter: "blur(16px)", opacity: 0.1 },
      { scale: 1, filter: "blur(0px)", opacity: 1, ease: "none" }
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      message: String(form.get("message") ?? ""),
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Something went wrong");
      setStatus("sent");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative flex min-h-[80vh] flex-col justify-center overflow-hidden px-[5vw] pt-20 pb-28"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(45% 40% at 30% 45%, rgba(255,69,25,0.16) 0%, transparent 75%)",
          animation: "contact-pulse 5s ease-in-out infinite",
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-[8%] right-[2%] -z-10 select-none font-display text-[42vh] font-bold leading-none text-ink/[0.04]"
      >
        PD
      </span>

      <LabelRow index="05" label="Contact" />
      <h2
        ref={headingRef}
        className="font-display font-semibold text-[clamp(2.6rem,8vw,6.5rem)] leading-[1] tracking-tight text-ink will-change-transform"
      >
        <InkHeadline as="span" className="block" seed={41}>
          Let&rsquo;s build
        </InkHeadline>
        <a
          href={`mailto:${profile.email}`}
          data-cursor-big
          className="text-accent underline decoration-accent/40 decoration-[6px] underline-offset-4 hover:decoration-accent transition-colors duration-300"
        >
          something real
        </a>
        .
      </h2>
      <Reveal delay={0.1} y={16} className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-3 text-[15px] text-muted">
        <span>{profile.email}</span>
        <span>{profile.location}</span>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-big
          className="text-muted transition-colors duration-300 hover:text-accent"
        >
          LinkedIn ↗
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-big
          className="text-muted transition-colors duration-300 hover:text-accent"
        >
          GitHub ↗
        </a>
      </Reveal>

      <Reveal delay={0.2}>
      <FocusReveal maxBlur={4} className="mt-16 max-w-lg">
        <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <input
            name="name"
            required
            placeholder="Your name"
            className="w-full bg-panel border border-line rounded-[10px] px-5 py-3.5 text-[15px] text-ink outline-none focus:border-accent transition-colors duration-300 placeholder:text-muted"
          />
        </div>
        <div>
          <input
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full bg-panel border border-line rounded-[10px] px-5 py-3.5 text-[15px] text-ink outline-none focus:border-accent transition-colors duration-300 placeholder:text-muted"
          />
        </div>
        <div>
          <textarea
            name="message"
            required
            rows={3}
            placeholder="What's on your mind?"
            className="w-full bg-panel border border-line rounded-[10px] px-5 py-3.5 text-[15px] text-ink outline-none focus:border-accent transition-colors duration-300 placeholder:text-muted resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          data-cursor-big
          className="rounded-full bg-accent text-bg px-6 py-3.5 text-[14px] font-semibold tracking-wide hover:bg-ink transition-colors duration-300 disabled:opacity-50"
        >
          {status === "sending" ? "Sending…" : "Send →"}
        </button>
        {status === "sent" && (
          <p className="inline-block bg-accent text-bg px-3 py-1 rounded-md text-sm font-medium">
            Message received — I'll reply soon.
          </p>
        )}
        {status === "error" && <p className="text-sm text-red-600">{error}</p>}
      </form>
      </FocusReveal>
      </Reveal>
    </section>
  );
}
