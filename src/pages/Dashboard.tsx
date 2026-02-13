import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TusharAIChat from "@/components/TusharAIChat";
import LetterSection from "@/components/LetterSection";
import { ChevronDown, ChevronUp } from "lucide-react";

const Dashboard = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [showLetter, setShowLetter] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Intro animation */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-2xl sm:text-3xl font-display text-foreground"
            >
              Hi Shreya ❤️
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      {!showIntro && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="h-screen flex flex-col lg:flex-row"
        >
          {/* Snap counter badge */}
          <div className="absolute top-4 right-4 z-20">
            <span className="text-xs px-3 py-1.5 rounded-full bg-rose-light/40 border border-rose-light/60 text-foreground/70">
              20 Days So Far ❤️
            </span>
          </div>

          {/* Desktop: Left - Letter */}
          <div className="hidden lg:block lg:w-[40%] border-r border-border overflow-y-auto">
            <LetterSection />
          </div>

          {/* Right - AI Chat (full on mobile) */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 min-h-0">
              <TusharAIChat />
            </div>

            {/* Mobile: Collapsible letter */}
            <div className="lg:hidden border-t border-border">
              <button
                onClick={() => setShowLetter(!showLetter)}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {showLetter ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
                {showLetter ? "Hide Letter" : "Read Tushar's Letter 💌"}
              </button>
              <AnimatePresence>
                {showLetter && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 300, opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-y-auto"
                  >
                    <LetterSection />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;
