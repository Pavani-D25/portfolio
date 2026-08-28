import PerspectiveText from "./PerspectiveText";

export default function Statement() {
  return (
    <section className="relative px-[5vw] py-40 flex items-center justify-center text-center">
      <PerspectiveText className="font-display font-semibold text-[clamp(2rem,5.5vw,4.2rem)] leading-[1.15] tracking-tight text-ink max-w-[18ch]">
        Research is only useful once someone can <span className="text-accent">actually use it.</span>
      </PerspectiveText>
    </section>
  );
}
