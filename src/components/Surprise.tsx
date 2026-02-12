import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Surprise = () => {
  const [revealed, setRevealed] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; color: string; delay: number }[]>([]);

  const triggerConfetti = useCallback(() => {
    const colors = [
      "hsl(340,65%,55%)", "hsl(270,40%,75%)", "hsl(20,70%,80%)",
      "hsl(345,70%,55%)", "hsl(40,70%,55%)", "hsl(350,50%,92%)",
    ];
    const items = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: colors[i % colors.length],
      delay: Math.random() * 0.5,
    }));
    setConfetti(items);
  }, []);

  const handleReveal = () => {
    setRevealed(true);
    triggerConfetti();
  };

  const handleAccept = () => {
    setAccepted(true);
    triggerConfetti();
  };

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center px-4 py-20 overflow-hidden">
      {/* Confetti */}
      <AnimatePresence>
        {confetti.map((c) => (
          <motion.div
            key={c.id}
            className="pointer-events-none fixed z-50 w-2.5 h-2.5 rounded-sm"
            style={{ backgroundColor: c.color, left: `${c.x}%`, top: "-5%" }}
            initial={{ y: 0, opacity: 1, rotate: 0 }}
            animate={{
              y: "110vh",
              opacity: [1, 1, 0],
              rotate: Math.random() * 720 - 360,
              x: (Math.random() - 0.5) * 200,
            }}
            transition={{ duration: 3, delay: c.delay, ease: "easeIn" }}
            onAnimationComplete={() => {
              setConfetti((prev) => prev.filter((p) => p.id !== c.id));
            }}
          />
        ))}
      </AnimatePresence>

      {!revealed ? (
        <motion.div className="text-center z-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <motion.button
            onClick={handleReveal}
            className="text-7xl sm:text-9xl cursor-pointer animate-pulse-glow rounded-full p-8 bg-primary/10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            💝
          </motion.button>
          <p className="font-display text-xl text-muted-foreground mt-6">Tap to reveal a surprise…</p>
        </motion.div>
      ) : !accepted ? (
        <motion.div
          className="glass-card rounded-2xl p-8 sm:p-12 text-center max-w-md z-10"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 20 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Will You Be Mine Forever?
          </h2>
          <p className="font-body text-muted-foreground mb-8">
            Every love story is beautiful, but ours is my favorite.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={handleAccept}
              className="glow-button rounded-full px-8 py-3 font-body text-lg font-medium text-primary-foreground"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
            >
              YES ❤️
            </motion.button>
            <motion.button
              onClick={handleAccept}
              className="rounded-full px-8 py-3 font-body text-lg font-medium bg-secondary text-secondary-foreground border border-primary/20"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
            >
              ALWAYS 💍
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="text-center z-10"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15 }}
        >
          <span className="text-7xl sm:text-9xl block mb-6">💕</span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-foreground mb-4">
            I Love You, Shreya!
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-md mx-auto">
            You just made me the happiest person in the world. This is just the beginning of forever. 🥰
          </p>
        </motion.div>
      )}
    </section>
  );
};

export default Surprise;
