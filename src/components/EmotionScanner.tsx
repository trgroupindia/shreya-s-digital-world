import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

const EmotionScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  const compliments = [
    "100% Pure Princess Energy 👑",
    "Heart: Overflowing with Love ❤️",
    "Brightness Level: Off the Charts ✨",
    "Grace Score: 99.9% Perfection 🎀",
    "Cuteness Alert: Maximum Capacity 🥰",
    "Soul Frequency: Pure Magic 🌟",
    "Love Potential: Infinite Forever 💕",
    "Smile Power: Can light up universes 😊",
    "Compassion Level: Immeasurable 🌸",
    "You: Worth everything to me 👰‍♀️",
  ];

  const handleScan = async () => {
    setIsScanning(true);
    setScanResult(null);

    // Scanning animation phases
    await new Promise((resolve) => setTimeout(resolve, 500));
    await new Promise((resolve) => setTimeout(resolve, 600));
    await new Promise((resolve) => setTimeout(resolve, 800));

    const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
    setScanResult(randomCompliment);
    setIsScanning(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative group"
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-rose-500/20 to-red-500/10 blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 -z-10" />

      <div className="rounded-xl p-8 bg-gradient-to-br from-slate-900/70 to-slate-800/50 border border-rose-400/30 backdrop-blur-sm hover:border-rose-400/60 transition-all duration-300">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-lg bg-rose-500/20 text-rose-400">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Secret Emotion Scanner</h3>
            <p className="text-xs text-rose-300/60">Let me read your heart 💖</p>
          </div>
        </div>

        {/* Scanning Animation */}
        <AnimatePresence mode="wait">
          {isScanning ? (
            <motion.div
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative py-16 flex flex-col items-center justify-center"
            >
              {/* Main scanning circle */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute w-32 h-32 border-2 border-transparent border-t-rose-400 border-r-rose-400 rounded-full"
              />

              {/* Middle scanning circle */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute w-24 h-24 border-2 border-transparent border-t-rose-500 border-r-rose-500 rounded-full"
              />

              {/* Inner heart */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  boxShadow: [
                    "0 0 20px rgba(244, 63, 94, 0.5)",
                    "0 0 40px rgba(244, 63, 94, 0.8)",
                    "0 0 20px rgba(244, 63, 94, 0.5)",
                  ],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="relative text-5xl z-10"
              >
                💖
              </motion.div>

              {/* Scanning lines */}
              <motion.div
                className="absolute top-4 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent"
                animate={{ y: [0, 80, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <p className="mt-12 text-sm text-rose-300">Scanning your heart...</p>
            </motion.div>
          ) : scanResult ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="text-center py-12"
            >
              {/* Result heart animation */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-6"
              >
                ❤️
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-xs text-rose-300/60 mb-2">SCAN RESULT:</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-rose-300 to-pink-300 bg-clip-text text-transparent mb-6">
                  {scanResult}
                </p>

                {/* Particle burst effect */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-lg"
                    initial={{
                      x: 0,
                      y: 0,
                      opacity: 1,
                    }}
                    animate={{
                      x: Math.cos((i / 8) * Math.PI * 2) * 80,
                      y: Math.sin((i / 8) * Math.PI * 2) * 80,
                      opacity: 0,
                    }}
                    transition={{ duration: 1.5 }}
                    style={{
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    ✨
                  </motion.div>
                ))}
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setScanResult(null)}
                className="mt-6 px-4 py-2 rounded-lg bg-rose-500/30 text-rose-300 text-sm border border-rose-400/50 hover:bg-rose-500/50 transition-all duration-300"
              >
                Scan Again
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-5xl mb-6"
              >
                💖
              </motion.div>

              <p className="text-sm text-rose-200/70 mb-6">
                Ready to discover what my heart sees in you
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleScan}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-rose-500 to-red-500 text-white font-semibold hover:shadow-[0_0_20px_rgba(244,63,94,0.5)] transition-all duration-300"
              >
                Scan My Heart 💖
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Glow effect */}
        <motion.div
          className="absolute top-0 right-0 w-40 h-40 bg-rose-500/20 rounded-full blur-3xl -z-10"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
};

export default EmotionScanner;
