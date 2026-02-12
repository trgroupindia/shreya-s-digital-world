import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Sparkles } from "lucide-react";

interface Song {
  title: string;
  artist: string;
  mood: string;
  reason: string;
}

const SongRecommender = ({ mood = "neutral" }: { mood?: string }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const songsByMood: Record<string, Song[]> = {
    happy: [
      {
        title: "sunroof",
        artist: "Nicky Youre",
        mood: "happy",
        reason: "Because your happiness radiates like sunlight ☀️",
      },
      {
        title: "Levitating",
        artist: "Dua Lipa",
        mood: "happy",
        reason: "You make me feel like I'm floating, Shreya ❤️",
      },
      {
        title: "Walking on Sunshine",
        artist: "Katrina & The Waves",
        mood: "happy",
        reason: "That's how you make me feel, always",
      },
    ],
    romantic: [
      {
        title: "Perfect",
        artist: "Ed Sheeran",
        mood: "romantic",
        reason: "Because that's what you are to me - perfect 💕",
      },
      {
        title: "kisses Down Low",
        artist: "Kelly Rowland",
        mood: "romantic",
        reason: "The intimacy in your words deserves this",
      },
      {
        title: "Like I'm Gonna Lose You",
        artist: "Meghan Trainor",
        mood: "romantic",
        reason: "I'd rather spend every moment with you than waste time",
      },
    ],
    sad: [
      {
        title: "Someone Like You",
        artist: "Adele",
        mood: "sad",
        reason: "Let me be your shoulder to cry on 💙",
      },
      {
        title: "Tears in Heaven",
        artist: "Eric Clapton",
        mood: "sad",
        reason: "I feel your pain, Shreya. You're not alone",
      },
      {
        title: "The Scientist",
        artist: "Coldplay",
        mood: "sad",
        reason: "Sometimes sad songs heal the heart better",
      },
    ],
    tired: [
      {
        title: "Weightless",
        artist: "Marconi Union",
        mood: "tired",
        reason: "Rest with me, let go of everything 🌙",
      },
      {
        title: "Falling Slowly",
        artist: "Glen Hansard",
        mood: "tired",
        reason: "Calm your mind and let sleep come to you",
      },
      {
        title: "Re: Stacks",
        artist: "Bon Iver",
        mood: "tired",
        reason: "Soft, gentle, just like I want to hold you",
      },
    ],
    angry: [
      {
        title: "Roar",
        artist: "Katy Perry",
        mood: "angry",
        reason: "Channel that fire into strength 🔥",
      },
      {
        title: "Break My Soul",
        artist: "Beyoncé",
        mood: "angry",
        reason: "Own your power, Shreya",
      },
      {
        title: "Stronger",
        artist: "Kelly Clarkson",
        mood: "angry",
        reason: "What doesn't break you makes you stronger",
      },
    ],
    neutral: [
      {
        title: "Halo",
        artist: "Beyoncé",
        mood: "neutral",
        reason: "You're my halo, my light in the darkness ✨",
      },
      {
        title: "Give Me Everything",
        artist: "Pitbull",
        mood: "neutral",
        reason: "I'd give you everything, Shreya",
      },
      {
        title: "Budapest",
        artist: "George Ezra",
        mood: "neutral",
        reason: "I'd give it all for you",
      },
    ],
  };

  const handleGenerateSong = async () => {
    setIsGenerating(true);

    // Simulate AI generation delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const moodSongs = songsByMood[mood] || songsByMood.neutral;
    const randomSong = moodSongs[Math.floor(Math.random() * moodSongs.length)];

    setCurrentSong(randomSong);
    setIsGenerating(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative group"
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/10 blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 -z-10" />

      <div className="rounded-xl p-8 bg-gradient-to-br from-slate-900/70 to-slate-800/50 border border-cyan-400/20 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-lg bg-cyan-500/20 text-cyan-400">
            <Music className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Tushar AI Recommends</h3>
            <p className="text-xs text-cyan-300/60">Just for your mood ❤️</p>
          </div>
        </div>

        {/* Song Display */}
        <AnimatePresence mode="wait">
          {currentSong ? (
            <motion.div
              key="song"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 rounded-lg bg-gradient-to-r from-purple-500/15 to-pink-500/15 border border-purple-400/30"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm text-pink-300/80 mb-1">Now Playing:</p>
                  <h4 className="text-lg font-bold text-white">{currentSong.title}</h4>
                  <p className="text-sm text-purple-300">{currentSong.artist}</p>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-2xl"
                >
                  🎶
                </motion.div>
              </div>
              <p className="text-xs text-pink-200/70 italic">{currentSong.reason}</p>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 p-4 rounded-lg bg-slate-700/30 border border-slate-600/30 text-center"
            >
              <p className="text-sm text-slate-400">Let AI scan your mood...</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Generate Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGenerateSong}
          disabled={isGenerating}
          className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-cyan-500/80 to-blue-500/80 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300 flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
              />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate Song For My Mood</span>
            </>
          )}
        </motion.button>

        {/* Glow effect */}
        <motion.div
          className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl -z-10"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
};

export default SongRecommender;
