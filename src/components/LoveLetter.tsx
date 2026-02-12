import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const paragraphs = [
  "My Dearest Shreya,",
  "From the very first moment you smiled at me, I knew my world had changed forever. Your laughter is the melody that plays on repeat in my heart.",
  "Every day with you feels like a page from a love story I never dared to dream. You are my sunrise, my calm, my everything.",
  "Thank you for being the most beautiful part of my life. I promise to love you more with each passing second.",
  "Forever & Always,\nTushar 💕",
];

const LoveLetter = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleCount(i);
      if (i >= paragraphs.length) clearInterval(interval);
    }, 1200);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section id="love-letter" className="relative flex min-h-screen items-center justify-center px-4 py-20">
      <div className="hero-gradient absolute inset-0 opacity-40" />

      {/* Floating petals */}
      {[...Array(8)].map((_, i) => (
        <span
          key={i}
          className="pointer-events-none absolute animate-float-heart text-rose-light"
          style={{
            left: `${10 + i * 12}%`,
            fontSize: `${14 + i * 2}px`,
            "--duration": `${10 + i * 2}s`,
            "--delay": `${i * 1.5}s`,
            animationDelay: `${i * 1.5}s`,
            opacity: 0.3,
          } as React.CSSProperties}
        >
          🌸
        </span>
      ))}

      <motion.div
        ref={ref}
        className="glass-card relative z-10 mx-auto max-w-2xl rounded-2xl p-8 sm:p-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-8 text-center">
          💌 A Letter For You
        </h2>
        <div className="space-y-4 font-body text-foreground/80 text-base sm:text-lg leading-relaxed">
          {paragraphs.map((p, i) => (
            <motion.p
              key={i}
              className={i === 0 ? "font-display text-xl italic text-primary" : i === paragraphs.length - 1 ? "font-display text-lg italic text-primary pt-4 whitespace-pre-line" : ""}
              initial={{ opacity: 0, y: 15 }}
              animate={visibleCount > i ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              {p}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default LoveLetter;
