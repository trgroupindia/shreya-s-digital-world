import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const fullText = "For Someone Very Special… Shreya ❤️";

const Hero = () => {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(interval);
    }, 70);
    return () => clearInterval(interval);
  }, []);

  const scrollDown = () => {
    document.getElementById("love-letter")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Animated gradient bg */}
      <div className="hero-gradient absolute inset-0 z-0" />
      {/* Overlay image */}
      <div
        className="absolute inset-0 z-[1] opacity-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center">
        <motion.h1
          className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-foreground leading-tight min-h-[1.2em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {typed}
          <span className="inline-block w-[3px] h-[0.8em] bg-primary ml-1 align-middle animate-[typewriter-cursor_1s_infinite]" />
        </motion.h1>

        <motion.p
          className="font-body text-lg sm:text-xl text-muted-foreground max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.8 }}
        >
          A small digital world made just for you.
        </motion.p>

        <motion.button
          onClick={scrollDown}
          className="glow-button mt-4 rounded-full px-8 py-3 font-body text-lg font-medium text-primary-foreground"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.8, duration: 0.5 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.97 }}
        >
          Enter My World 💖
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
