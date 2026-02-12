import { motion } from "framer-motion";
import { Heart, Flame, Moon, Laugh } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  maxValue: number;
  color: string;
  glowColor: string;
}

const StatCard = ({ icon, label, value, maxValue, color, glowColor }: StatCardProps) => {
  const percentage = (value / maxValue) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative group"
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-pink-500/10 to-purple-500/5 blur-lg group-hover:blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
      <div className={`relative rounded-xl p-6 bg-gradient-to-br from-slate-900/60 to-slate-800/40 border border-${color}/30 backdrop-blur-sm hover:border-${color}/60 transition-all duration-300`}>
        {/* Circular Progress */}
        <div className="flex items-center justify-center mb-4">
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="3" />
              <motion.circle
                cx="48"
                cy="48"
                r="40"
                fill="none"
                stroke={`url(#gradient-${color})`}
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ strokeDasharray: 251 }}
                animate={{ strokeDasharray: 251, strokeDashoffset: 251 - (251 * percentage) / 100 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={glowColor} />
                  <stop offset="100%" stopColor={`${glowColor}80`} />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className={`text-xs text-${color}/60`}>/ {maxValue}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Label and Icon */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className={`p-2 rounded-lg bg-${color}/20 text-${color}`}>{icon}</div>
        </div>
        <p className="text-center text-sm font-semibold text-white">{label}</p>

        {/* Glow effect */}
        <motion.div
          className={`absolute inset-0 rounded-xl bg-${color}/5 blur-lg`}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
};

const LoveEnergyPanel = ({ mood = "neutral" }: { mood?: string }) => {
  // Stats that change based on mood
  const stats = {
    emotionalBond: Math.floor(Math.random() * (100 - 85) + 85), // 85-100
    chemistry: Math.floor(Math.random() * (95 - 80) + 80), // 80-95
    lateNightTalks: Math.floor(Math.random() * (150 - 100) + 100), // 100-150
    laughs: Math.floor(Math.random() * (500 - 300) + 300), // 300-500
  };

  // Mood affects the stats
  const moodMultiplier = {
    happy: 1.2,
    romantic: 1.4,
    sad: 0.8,
    tired: 0.7,
    angry: 0.6,
    neutral: 1.0,
  }[mood as keyof typeof moodMultiplier] || 1.0;

  return (
    <div className="relative">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent flex items-center gap-2">
          <Heart className="w-6 h-6 text-pink-500" />
          Love Energy Panel
        </h2>
        <p className="text-sm text-pink-300/60 mt-1">Our connection in real-time</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={<Heart className="w-5 h-5" />}
          label="Emotional Bond"
          value={Math.floor(stats.emotionalBond * moodMultiplier)}
          maxValue={100}
          color="pink"
          glowColor="#ff69b4"
        />
        <StatCard
          icon={<Flame className="w-5 h-5" />}
          label="Chemistry Meter"
          value={Math.floor(stats.chemistry * moodMultiplier)}
          maxValue={100}
          color="orange"
          glowColor="#ff4500"
        />
        <StatCard
          icon={<Moon className="w-5 h-5" />}
          label="Late Night Talks"
          value={Math.floor(stats.lateNightTalks * moodMultiplier)}
          maxValue={200}
          color="indigo"
          glowColor="#7c3aed"
        />
        <StatCard
          icon={<Laugh className="w-5 h-5" />}
          label="Total Laughs"
          value={Math.floor(stats.laughs * moodMultiplier)}
          maxValue={1000}
          color="amber"
          glowColor="#fbbf24"
        />
      </div>

      {/* Glow background animation */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-3xl -z-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </div>
  );
};

export default LoveEnergyPanel;
