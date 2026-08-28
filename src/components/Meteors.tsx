// Deterministic string hash → seeded PRNG, so meteor positions are stable
// across server/client renders instead of using Math.random.
function seededRandom(seed: string) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}

export default function Meteors({ seed, count }: { seed: string; count: number }) {
  const rand = seededRandom(seed);
  const meteors = Array.from({ length: count }, () => ({
    top: rand() * 55,
    left: 15 + rand() * 70,
    delay: rand() * 6,
    duration: 4 + rand() * 3,
  }));
  return (
    <>
      {meteors.map((m, i) => (
        <span
          key={i}
          aria-hidden
          className="meteor"
          style={{
            top: `${m.top}%`,
            left: `${m.left}%`,
            animationDelay: `${m.delay}s`,
            animationDuration: `${m.duration}s`,
          }}
        />
      ))}
    </>
  );
}
