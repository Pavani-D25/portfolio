"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";
import { useFocusPull } from "@/lib/focusPull";

type Props = ComponentPropsWithoutRef<"div"> & {
  maxBlur?: number;
};

export default function FocusReveal({ children, className = "", maxBlur = 5, ...rest }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  useFocusPull(ref, maxBlur);

  return (
    <div ref={ref} className={className} {...rest}>
      {children}
    </div>
  );
}
