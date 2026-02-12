import { motion } from "framer-motion";
import FloatingHearts from "@/components/FloatingHearts";

const Forever = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center hero-gradient overflow-hidden">
      <FloatingHearts count={30} />
      <motion.div
        className="glass-card relative z-10 rounded-2xl p-10 sm:p-16 text-center max-w-lg mx-4"
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", damping: 15, delay: 0.3 }}
      >
        <span className="text-6xl sm:text-8xl block mb-6">💍</span>
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-foreground mb-4">
          Forever & Always
        </h1>
        <p className="font-body text-lg text-muted-foreground mb-6">
          You found the secret page, Shreya. Just like you found a way into my heart — quietly, beautifully, and forever.
        </p>
        <p className="font-display italic text-xl text-primary">
          — Tushar 💕
        </p>
      </motion.div>
    </div>
  );
};

export default Forever;
