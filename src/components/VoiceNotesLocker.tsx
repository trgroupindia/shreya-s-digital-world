import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, LockOpen, Play, Pause } from "lucide-react";

interface VoiceNote {
  id: string;
  date: string;
  duration: string;
  preview: string;
  locked: boolean;
}

const VoiceNotesLocker = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const voiceNotes: VoiceNote[] = [
    {
      id: "1",
      date: "14 Feb 2026",
      duration: "5:32",
      preview: '"I miss you, always..."',
      locked: true,
    },
    {
      id: "2",
      date: "13 Feb 2026",
      duration: "3:15",
      preview: '"Forever with you..."',
      locked: true,
    },
    {
      id: "3",
      date: "12 Feb 2026",
      duration: "7:44",
      preview: '"Listen to my heart..."',
      locked: true,
    },
    {
      id: "4",
      date: "11 Feb 2026",
      duration: "4:22",
      preview: '"You are my forever..."',
      locked: true,
    },
  ];

  const handleUnlock = async () => {
    // Digital scan animation
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsUnlocked(true);
  };

  const waveformVariants = {
    locked: { height: 0 },
    unlocked: (i: number) => ({
      height: [20, 40, 30, 50, 25, 45, 35][i % 7],
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative group"
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 -z-10" />

      <div className="rounded-xl p-8 bg-gradient-to-br from-slate-900/70 to-slate-800/50 border border-amber-400/30 backdrop-blur-sm hover:border-amber-400/60 transition-all duration-300">
        {/* Header with lock icon */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-amber-500/20 text-amber-400">
              {isUnlocked ? (
                <LockOpen className="w-5 h-5" />
              ) : (
                <Lock className="w-5 h-5" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Private Voice Notes</h3>
              <p className="text-xs text-amber-300/60">Encrypted with love ❤️</p>
            </div>
          </div>
          <motion.div
            animate={isUnlocked ? { rotate: 0, scale: 1 } : { rotate: -90, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-2xl"
          >
            🔐
          </motion.div>
        </div>

        {!isUnlocked ? (
          // Locked State
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px rgba(251, 191, 36, 0.3)",
                  "0 0 40px rgba(251, 191, 36, 0.5)",
                  "0 0 20px rgba(251, 191, 36, 0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-4"
            >
              <Lock className="w-12 h-12 text-amber-400" />
            </motion.div>
            <p className="text-sm text-amber-200/70 mb-6">
              Voice notes locked by Tushar's heart
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleUnlock}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:shadow-[0_0_20px_rgba(251,146,60,0.5)] transition-all duration-300"
            >
              Unlock with Fingerprint 👆
            </motion.button>
          </motion.div>
        ) : (
          // Unlocked State
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            {voiceNotes.map((note) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="p-4 rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/5 border border-amber-400/30 hover:border-amber-400/60 transition-all duration-300 group/note"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          setPlayingId(playingId === note.id ? null : note.id)
                        }
                        className="p-2 rounded-full bg-amber-500/30 text-amber-400 hover:bg-amber-500/50 transition-all duration-300"
                      >
                        {playingId === note.id ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </motion.button>
                      <div>
                        <p className="text-sm font-semibold text-white">{note.date}</p>
                        <p className="text-xs text-amber-300/70">{note.duration}</p>
                      </div>
                    </div>
                    <p className="text-xs text-amber-100/60 italic ml-10">
                      {note.preview}
                    </p>
                  </div>

                  {/* Animated Waveform */}
                  {playingId === note.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-1 ml-4"
                    >
                      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1 bg-gradient-to-t from-amber-500 to-orange-400 rounded-full"
                          animate={{
                            height: [6, 20, 12, 24, 16, 22, 14],
                          }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.1,
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-xs text-amber-300/50 mt-4 text-center"
            >
              Total {voiceNotes.length} memories recorded in our hearts 💕
            </motion.p>
          </motion.div>
        )}

        {/* Glow effect */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-32 bg-amber-500/20 rounded-full blur-3xl -z-10"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
};

export default VoiceNotesLocker;
