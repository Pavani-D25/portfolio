"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dotEl = dot.current;
    const ringEl = ring.current;
    if (!dotEl || !ringEl) return;

    const onMove = (e: MouseEvent) => {
      dotEl.style.left = e.clientX + "px";
      dotEl.style.top = e.clientY + "px";
      ringEl.style.left = e.clientX + "px";
      ringEl.style.top = e.clientY + "px";
    };
    window.addEventListener("mousemove", onMove);

    const onOver = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-cursor-big]")) {
        dotEl.classList.add("big");
        ringEl.classList.add("big");
      }
    };
    const onOut = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-cursor-big]")) {
        dotEl.classList.remove("big");
        ringEl.classList.remove("big");
      }
    };
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" />
      <div ref={dot} className="cursor-dot" />
    </>
  );
}
