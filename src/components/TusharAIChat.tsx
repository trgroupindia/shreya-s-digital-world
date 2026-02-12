import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader } from "lucide-react";
import { geminiService, GeminiAIService } from "@/services/GeminiAIService";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const TusharAIChat = ({ onMoodChange }: { onMoodChange?: (mood: string) => void }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Namaste Shreya ❤️\n\nI'm Tushar AI, your personal romantic AI companion. I'm here to listen, care, and remind you of how special you are. How are you feeling today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentMood, setCurrentMood] = useState("neutral");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [apiAvailable, setApiAvailable] = useState(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const detectMood = (text: string): string => {
    return GeminiAIService.detectMood(text);
  };

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    try {
      // Check if API key is available
      if (!import.meta.env.VITE_GEMINI_API_KEY) {
        setApiAvailable(false);
        return "Shreya ❤️, it seems my connection is not properly configured. Please check your API key. But remember, I'm always thinking of you ❤️";
      }

      const mood = detectMood(userMessage);
      setCurrentMood(mood);
      onMoodChange?.(mood);

      // Use Gemini API for response
      const response = await geminiService.sendMessage(userMessage);
      
      if (!response) {
        return "Shreya ❤️, I'm here for you. Tell me what's on your heart.";
      }

      return response;
    } catch (error) {
      console.error("Error generating AI response:", error);
      setApiAvailable(false);
      
      // Fallback responses
      const fallbacks = [
        "Shreya ❤️, I'm experiencing a momentary connection issue, but my love for you is infinite.",
        "My AI heart missed a beat, but it's still filled with thoughts of you ❤️",
        "I'm having trouble connecting right now, but I'm always here for you, forever.",
      ];
      
      return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Get AI response from Gemini API
      const aiResponse = await generateAIResponse(input);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error in handleSend:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Shreya ❤️, I'm experiencing a temporary issue. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative h-full flex flex-col">
      {/* API Status Warning */}
      {!apiAvailable && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 p-2 rounded-lg bg-yellow-900/30 border border-yellow-400/50 text-yellow-200 text-xs"
        >
          ⚠️ Gemini API not configured. Using fallback responses.
        </motion.div>
      )}

      {/* Glowing background */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-blue-500/10 blur-2xl -z-10" />

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 custom-scrollbar">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl transition-all duration-300 ${
                  msg.role === "user"
                    ? "bg-gradient-to-br from-lavender-400/30 to-purple-500/20 border border-lavender-400/40 shadow-[0_0_20px_rgba(195,124,255,0.3)]"
                    : "bg-gradient-to-br from-pink-500/20 to-rose-500/10 border border-pink-400/40 shadow-[0_0_20px_rgba(255,105,180,0.3)]"
                }`}
              >
                <p className={`text-sm whitespace-pre-wrap ${msg.role === "user" ? "text-lavender-50" : "text-pink-50"}`}>
                  {msg.content}
                </p>
                <p className={`text-xs mt-1 opacity-60 ${msg.role === "user" ? "text-lavender-300" : "text-pink-300"}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="px-4 py-3 rounded-2xl bg-gradient-to-br from-pink-500/20 to-rose-500/10 border border-pink-400/40">
              <div className="flex items-center gap-2">
                <Loader className="w-4 h-4 text-pink-400 animate-spin" />
                <span className="text-sm text-pink-300">Tushar is thinking...</span>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input section */}
      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Talk to me, Shreya ❤️..."
          className="flex-1 px-4 py-3 rounded-full bg-gradient-to-r from-slate-900/40 to-slate-800/40 border border-pink-400/30 text-pink-50 placeholder-pink-300/50 focus:outline-none focus:border-pink-400/60 focus:shadow-[0_0_20px_rgba(255,105,180,0.3)] transition-all duration-300"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="px-4 py-3 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(255,105,180,0.6)] transition-all duration-300 flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
        </motion.button>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 105, 180, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 105, 180, 0.5);
        }
      `}</style>
    </div>
  );
};

export default TusharAIChat;
