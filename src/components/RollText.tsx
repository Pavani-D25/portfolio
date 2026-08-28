// Per-character "roll" hover effect: each character sits in its own
// overflow-hidden slot with a duplicate stacked below; hovering the
// ancestor `.group` slides the original up and the duplicate in behind it,
// staggered per character for a wave-like motion.
export default function RollText({ text }: { text: string }) {
  return (
    <span className="relative inline-flex overflow-hidden align-bottom">
      {text.split("").map((c, i) => (
        <span key={i} className="relative inline-block h-[1.2em] overflow-hidden">
          <span
            className="block transition-transform duration-300 ease-out group-hover:-translate-y-full"
            style={{ transitionDelay: `${i * 16}ms` }}
          >
            {c === " " ? " " : c}
          </span>
          <span
            aria-hidden
            className="absolute inset-0 block translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"
            style={{ transitionDelay: `${i * 16}ms` }}
          >
            {c === " " ? " " : c}
          </span>
        </span>
      ))}
    </span>
  );
}
