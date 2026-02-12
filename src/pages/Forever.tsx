import { useState } from "react";
import { motion } from "framer-motion";

const Forever = () => {
  const [showHeartExplosion, setShowHeartExplosion] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleAcceptForever = () => {
    setShowHeartExplosion(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight effect following cursor */}
      <motion.div
        className="fixed pointer-events-none w-96 h-96 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255, 105, 180, 0.3) 0%, rgba(255, 105, 180, 0.1) 40%, transparent 70%)",
          filter: "blur(40px)",
          left: mousePos.x - 192,
          top: mousePos.y - 192,
        }}
        animate={{
          boxShadow: ["0 0 60px rgba(255, 105, 180, 0.4)", "0 0 100px rgba(255, 105, 180, 0.6)", "0 0 60px rgba(255, 105, 180, 0.4)"],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Dark romantic background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-pink-950/40 to-transparent"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      {/* Animated grid background */}
      <motion.div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 105, 180, 0.05) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255, 105, 180, 0.05) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
        animate={{
          backgroundPosition: ["0px 0px", "50px 50px"],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating stars/particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed w-0.5 h-0.5 bg-pink-400 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: Math.random() * 0.5 + 0.3,
          }}
          animate={{
            y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight - 100],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 8 + Math.random() * 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Main content with spotlight reveal */}
      <motion.div
        className="relative z-10 rounded-2xl p-10 sm:p-16 text-center max-w-lg mx-4"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", damping: 15, delay: 0.3, duration: 1 }}
      >
        {/* Glowing border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/10 blur-lg -z-10" />
        <div className="absolute inset-0 rounded-2xl border border-pink-500/40 -z-10" />

        {/* Ring Emoji with glow */}
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.5, type: "spring", bounce: 0.5 }}
          className="mb-6"
        >
          <motion.span
            className="text-6xl sm:text-8xl block drop-shadow-[0_0_30px_rgba(255,105,180,0.6)]"
            animate={{
              scale: [1, 1.1, 1],
              textShadow: [
                "0 0 20px rgba(255, 105, 180, 0.5)",
                "0 0 40px rgba(255, 105, 180, 0.8)",
                "0 0 20px rgba(255, 105, 180, 0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💍
          </motion.span>
        </motion.div>

        {/* Text reveal with stagger */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-pink-300 via-rose-300 to-pink-300 bg-clip-text text-transparent mb-4"
        >
          You + Me = Always
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="font-body text-lg text-pink-100/90 mb-6 leading-relaxed"
        >
          You found the secret page, Shreya. Just like you found a way into my heart — quietly, beautifully, and forever.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="font-display italic text-xl text-pink-300 mb-8"
        >
          — Tushar 💕
        </motion.p>

        {/* Accept Forever Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAcceptForever}
          className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(255,105,180,0.6)] transition-all duration-300 relative overflow-hidden"
        >
          <motion.span
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Accept My Forever ❤️
          </motion.span>
        </motion.button>
      </motion.div>

      {/* Heart Explosion on Button Click */}
      {showHeartExplosion &&
        [...Array(50)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="fixed text-3xl pointer-events-none"
            initial={{
              x: window.innerWidth / 2,
              y: window.innerHeight / 2,
              opacity: 1,
            }}
            animate={{
              x:
                window.innerWidth / 2 +
                Math.cos((i / 50) * Math.PI * 2) * (100 + Math.random() * 200),
              y:
                window.innerHeight / 2 +
                Math.sin((i / 50) * Math.PI * 2) * (100 + Math.random() * 200),
              opacity: 0,
              scale: [1, 0.5, 0],
            }}
            transition={{
              duration: 1.5 + Math.random() * 0.5,
              ease: "easeOut",
            }}
          >
            {["❤️", "💕", "💖", "💗"][i % 4]}
          </motion.div>
        ))}

      {/* Final Message Screen after explosion */}
      {showHeartExplosion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="text-5xl font-bold bg-gradient-to-r from-pink-300 to-rose-300 bg-clip-text text-transparent mb-4">
              Forever Begins Now
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-3xl text-pink-200"
            >
              Our love story has no end ∞
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Forever;
