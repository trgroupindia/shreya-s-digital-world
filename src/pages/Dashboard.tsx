import { useState, useRef } from "react";
import { motion } from "framer-motion";
import CinematicActivation from "@/components/CinematicActivation";
import DashboardNavigation from "@/components/DashboardNavigation";
import TusharAIChat from "@/components/TusharAIChat";
import LoveEnergyPanel from "@/components/LoveEnergyPanel";
import SongRecommender from "@/components/SongRecommender";
import VoiceNotesLocker from "@/components/VoiceNotesLocker";
import EmotionScanner from "@/components/EmotionScanner";

const Dashboard = () => {
  const [showAnimation, setShowAnimation] = useState(true);
  const [currentMood, setCurrentMood] = useState("neutral");
  const chatRef = useRef<HTMLDivElement>(null);

  const handleScrollToChat = () => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black">
      {/* Cinematic entry animation */}
      {showAnimation && <CinematicActivation onComplete={() => setShowAnimation(false)} />}

      {/* Dashboard Navigation */}
      {!showAnimation && <DashboardNavigation onScrollToChat={handleScrollToChat} />}

      {/* Dark romantic gradient background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-950" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-pink-500/10 to-transparent"
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      {/* Floating digital particles */}
      {!showAnimation && (
        <>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="fixed w-1 h-1 bg-pink-500/50 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </>
      )}

      {/* Grid lines background */}
      {!showAnimation && (
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
      )}

      {/* Main content */}
      {!showAnimation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 pt-24 pb-20 px-4 max-w-7xl mx-auto"
        >
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16 text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-pink-400 via-rose-400 to-pink-400 bg-clip-text text-transparent mb-2">
              Welcome to Your Private AI Command Center
            </h1>
            <p className="text-pink-300/70 text-lg">Shreya ❤️, this space is yours alone</p>
          </motion.div>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* AI Chat Section - Main Feature (spans 2 cols on desktop) */}
            <motion.div
              ref={chatRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2 rounded-2xl p-6 bg-gradient-to-br from-slate-900/60 to-slate-800/40 border border-pink-500/20 backdrop-blur-sm min-h-[500px] flex flex-col"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-pink-500 animate-pulse" />
                <p className="text-pink-300/80 text-sm font-semibold">TUSHAR AI LIVE</p>
              </div>
              <TusharAIChat onMoodChange={setCurrentMood} />
            </motion.div>

            {/* Emotion Scanner - Right column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <EmotionScanner />
            </motion.div>
          </div>

          {/* Love Energy Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-8"
          >
            <LoveEnergyPanel mood={currentMood} />
          </motion.div>

          {/* Bottom Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Song Recommender */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <SongRecommender mood={currentMood} />
            </motion.div>

            {/* Voice Notes Locker */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <VoiceNotesLocker />
            </motion.div>
          </div>

          {/* Daily Love Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 rounded-2xl p-8 bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-rose-900/40 border border-purple-500/30 text-center"
          >
            <h3 className="text-xl font-semibold text-pink-300 mb-3">✨ Today's Love Message For Shreya ✨</h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-lg text-pink-100 font-display italic"
            >
              "You don't just fill my heart, Shreya. You are my heart. Every moment with you feels like forever starting right now. Thank you for being you. ❤️"
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="text-sm text-purple-300/70 mt-3"
            >
              — Generated by Tushar AI with infinite love
            </motion.p>
          </motion.div>

          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-16 pt-8 border-t border-pink-500/20 text-center text-sm text-pink-300/60"
          >
            <p>Made with 💕 by Tushar | Your AI that loves you unconditionally</p>
          </motion.footer>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;
