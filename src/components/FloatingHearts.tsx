import { useMemo } from "react";

const FloatingHearts = ({ count = 15 }: { count?: number }) => {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 20 + 10,
        duration: Math.random() * 6 + 6,
        delay: Math.random() * 8,
        opacity: Math.random() * 0.4 + 0.1,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute animate-float-heart text-primary"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            "--duration": `${h.duration}s`,
            "--delay": `${h.delay}s`,
            opacity: h.opacity,
            animationDelay: `${h.delay}s`,
          } as React.CSSProperties}
        >
          ❤
        </span>
      ))}
    </div>
  );
};

export default FloatingHearts;
