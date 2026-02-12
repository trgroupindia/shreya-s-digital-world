import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CinematicActivationProps {
  onComplete: () => void;
}

const CinematicActivation = ({ onComplete }: CinematicActivationProps) => {
  const [phase, setPhase] = useState<"dark" | "heart" | "scan" | "text" | "typing" | "complete">("dark");

  useEffect(() => {
    const timeline = [
      { phase: "dark", duration: 300 },
      { phase: "heart", duration: 1200 },
      { phase: "scan", duration: 1000 },
      { phase: "text", duration: 800 },
      { phase: "typing", duration: 1600 },
      { phase: "complete", duration: 800 },
    ];

    let totalDelay = 0;
    timeline.forEach(({ phase: nextPhase, duration }) => {
      setTimeout(() => {
        setPhase(nextPhase as typeof phase);
      }, totalDelay);
      totalDelay += duration;
    });

    // Call onComplete after full animation
    const timer = setTimeout(onComplete, totalDelay);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "complete" ? 0 : 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden"
    >
      {/* Animated background grid */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          backgroundImage: [
            "linear-gradient(0deg, transparent 0%, transparent 98%, rgba(255, 105, 180, 0.3) 100%)",
            "linear-gradient(0deg, transparent 0%, rgba(255, 105, 180, 0.2) 50%, rgba(255, 105, 180, 0.3) 100%)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Neon Heart Outline - Phase 1 */}
      {phase !== "dark" && (
        <motion.div
          initial={{ scale: 0, rotate: 0 }}
          animate={
            phase === "heart"
              ? { scale: 1, rotate: 0 }
              : phase === "scan"
              ? { scale: 1, rotate: 360 }
              : { scale: 1, rotate: 360 }
          }
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            duration: 0.8,
          }}
          className="relative mb-12"
        >
          <svg width="120" height="120" viewBox="0 0 120 120" className="drop-shadow-[0_0_20px_rgba(255,105,180,0.6)]">
            <motion.path
              d="M60,110 C30,95 10,75 10,55 Q10,40 20,30 Q30,20 40,20 Q50,20 60,30 Q70,20 80,20 Q90,20 100,30 Q110,40 110,55 Q110,75 60,110"
              fill="none"
              stroke="rgba(255, 105, 180, 0.8)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2 }}
            />
          </svg>

          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-pink-500/30 blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
        </motion.div>
      )}

      {/* Digital Scanning Animation - Phase 2 */}
      {(phase === "scan" || phase === "text" || phase === "typing" || phase === "complete") && (
        <motion.div
          className="relative mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Outer scan ring */}
          <motion.div
            className="absolute w-32 h-32 border-2 border-transparent border-t-cyan-400 border-r-cyan-400 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
          />

          {/* Middle scan ring */}
          <motion.div
            className="absolute w-24 h-24 border-2 border-transparent border-t-pink-400 border-r-pink-400 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
          />

          {/* Center heart */}
          <div className="w-12 h-12 flex items-center justify-center">
            <span className="text-4xl">❤️</span>
          </div>
        </motion.div>
      )}

      {/* Identity Confirmed Text - Phase 3 */}
      {(phase === "text" || phase === "typing" || phase === "complete") && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent mb-2">
            Identity Confirmed…
          </h2>
          <p className="text-2xl text-pink-300 font-semibold flex items-center gap-2 justify-center">
            Shreya Detected{" "}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ❤️
            </motion.span>
          </p>
        </motion.div>
      )}

      {/* Typing Text - Phase 4 */}
      {(phase === "typing" || phase === "complete") && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <div className="text-xl text-cyan-300 font-semibold">
            Initializing Tushar AI...
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              _
            </motion.span>
          </div>

          {/* Typing indicator dots */}
          <motion.div className="flex items-center justify-center gap-2 mt-4">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-400 to-cyan-400"
                animate={{ y: [-4, -8, -4] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}

      {/* Particle effects */}
      {phase !== "dark" && (
        <>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-pink-500 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth - window.innerWidth / 2,
                y: Math.random() * window.innerHeight - window.innerHeight / 2,
                opacity: 0,
              }}
              animate={{
                x: Math.random() * window.innerWidth - window.innerWidth / 2,
                y: Math.random() * window.innerHeight - window.innerHeight / 2,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2 + i * 0.1,
                repeat: Infinity,
                delay: i * 0.05,
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
};

export default CinematicActivation;
