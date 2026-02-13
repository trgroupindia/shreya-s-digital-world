import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic, MicOff, Volume2, VolumeX, Paperclip, Phone, X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  imageUrl?: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/tushar-chat`;

const TusharAIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hey Shreya ❤️\n\nMain hoon yahan, tere liye. Kuch bhi baat karna ho, I'm all ears. How's your day going?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isCallMode, setIsCallMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Speech synthesis
  const speak = useCallback((text: string) => {
    if (!voiceEnabled) return;
    const cleaned = text.replace(/[❤️💕💖✨🌸💗😊🥰💞🎵]/g, "").trim();
    if (!cleaned) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(cleaned);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.lang = "hi-IN";
    const voices = window.speechSynthesis.getVoices();
    const hindiVoice = voices.find(v => v.lang.startsWith("hi"));
    if (hindiVoice) utterance.voice = hindiVoice;
    window.speechSynthesis.speak(utterance);
  }, [voiceEnabled]);

  // Streaming chat
  const sendMessage = async (text: string, imageUrl?: string) => {
    if (!text.trim() && !imageUrl) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      imageUrl,
    };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const chatMessages = [...messages, userMsg]
      .filter(m => m.id !== "welcome" || m.role === "assistant")
      .map(m => ({
        role: m.role,
        content: m.imageUrl ? `[User shared an image: ${m.imageUrl}]\n${m.content}` : m.content,
      }));

    let assistantSoFar = "";
    const assistantId = (Date.now() + 1).toString();

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: chatMessages }),
      });

      if (!resp.ok || !resp.body) {
        throw new Error(`Request failed: ${resp.status}`);
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantSoFar += content;
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant" && last.id === assistantId) {
                  return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantSoFar } : m);
                }
                return [...prev, { id: assistantId, role: "assistant", content: assistantSoFar }];
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Final flush
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw || raw.startsWith(":") || !raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantSoFar += content;
              setMessages(prev =>
                prev.map((m, i) => i === prev.length - 1 && m.id === assistantId ? { ...m, content: assistantSoFar } : m)
              );
            }
          } catch { /* ignore */ }
        }
      }

      if (assistantSoFar) speak(assistantSoFar);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages(prev => [
        ...prev,
        { id: assistantId, role: "assistant", content: "Shreya ❤️, mujhe abhi connect hone mein thodi problem ho rahi hai. Ek baar phir try kar na?" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Voice input
  const toggleListening = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) return;

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "hi-IN";
    recognition.interimResults = true;
    recognition.continuous = isCallMode;

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((r: any) => r[0].transcript)
        .join("");
      if (isCallMode && event.results[event.results.length - 1].isFinal) {
        sendMessage(transcript);
      } else {
        setInput(transcript);
      }
    };

    recognition.onend = () => {
      if (isCallMode) {
        recognition.start();
      } else {
        setIsListening(false);
      }
    };

    recognition.onerror = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  // File upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      sendMessage(input || "Yeh dekho 📷", dataUrl);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  // Call mode
  const toggleCallMode = () => {
    if (isCallMode) {
      recognitionRef.current?.stop();
      setIsListening(false);
      setIsCallMode(false);
      window.speechSynthesis.cancel();
    } else {
      setIsCallMode(true);
      setVoiceEnabled(true);
      // Auto-start listening after a short delay
      setTimeout(() => {
        if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
          const SR = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
          const recognition = new SR();
          recognition.lang = "hi-IN";
          recognition.interimResults = true;
          recognition.continuous = true;

          recognition.onresult = (event: any) => {
            const transcript = Array.from(event.results)
              .map((r: any) => r[0].transcript)
              .join("");
            if (event.results[event.results.length - 1].isFinal) {
              sendMessage(transcript);
            }
          };

          recognition.onend = () => {
            try { recognition.start(); } catch {}
          };

          recognition.onerror = () => setIsListening(false);

          recognitionRef.current = recognition;
          recognition.start();
          setIsListening(true);
        }
      }, 500);
    }
  };

  // Call mode UI
  if (isCallMode) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center"
        style={{ background: "linear-gradient(135deg, hsl(340 30% 15%), hsl(280 25% 12%), hsl(340 30% 15%))" }}
      >
        <motion.div
          className="w-28 h-28 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white text-4xl font-display mb-6"
          animate={isListening ? { scale: [1, 1.15, 1], boxShadow: ["0 0 0px hsl(340 65% 55% / 0.4)", "0 0 40px hsl(340 65% 55% / 0.6)", "0 0 0px hsl(340 65% 55% / 0.4)"] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          T
        </motion.div>
        <p className="text-rose-200 text-lg font-display mb-2">Tushar AI</p>
        <p className="text-rose-300/60 text-sm mb-8">
          {isListening ? "Listening..." : "Tap mic to start"}
        </p>

        {/* Waveform */}
        <div className="flex gap-1 items-end h-8 mb-10">
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 rounded-full bg-rose-400/60"
              animate={isListening ? { height: [8, 20 + Math.random() * 12, 8] } : { height: 8 }}
              transition={{ duration: 0.5 + Math.random() * 0.3, repeat: Infinity, delay: i * 0.08 }}
            />
          ))}
        </div>

        <div className="flex gap-6">
          <button
            onClick={toggleListening}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
              isListening ? "bg-rose-500 text-white" : "bg-white/10 text-rose-300 border border-rose-500/30"
            }`}
          >
            {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>
          <button
            onClick={toggleCallMode}
            className="w-14 h-14 rounded-full bg-red-500/80 text-white flex items-center justify-center"
          >
            <Phone className="w-6 h-6 rotate-[135deg]" />
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-rose-200/20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
            T
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Tushar AI</p>
            <p className="text-xs text-muted-foreground">For Shreya ❤️</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className="p-2 rounded-full hover:bg-rose-100/50 text-muted-foreground transition-colors"
            title={voiceEnabled ? "Mute voice" : "Enable voice"}
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button
            onClick={toggleCallMode}
            className="p-2 rounded-full hover:bg-rose-100/50 text-muted-foreground transition-colors"
            title="Call Tushar AI"
          >
            <Phone className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        <AnimatePresence>
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-lavender/20 border border-lavender/30 text-foreground rounded-br-md"
                    : "bg-rose-light/30 border border-rose-light/40 text-foreground rounded-bl-md"
                }`}
              >
                {msg.imageUrl && (
                  <img
                    src={msg.imageUrl}
                    alt="shared"
                    className="rounded-lg mb-2 max-h-48 object-cover"
                  />
                )}
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="px-4 py-2.5 rounded-2xl bg-rose-light/30 border border-rose-light/40 rounded-bl-md">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input bar */}
      <div className="sticky bottom-0 px-3 py-3 border-t border-border bg-background/80 backdrop-blur-sm">
        <div className="flex items-center gap-1.5 px-3 py-2 rounded-full glass-card">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="shrink-0 p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors"
          >
            <Paperclip className="w-4 h-4" />
          </button>
          <input type="file" ref={fileInputRef} accept="image/*,.pdf" className="hidden" onChange={handleFileUpload} />

          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
            placeholder="Kuch bhi bol do..."
            className="flex-1 min-w-0 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />

          <button
            onClick={toggleListening}
            className={`shrink-0 p-2 rounded-full transition-colors ${
              isListening ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground"
            }`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <button
            onClick={() => sendMessage(input)}
            disabled={isLoading || (!input.trim())}
            className="shrink-0 p-2 rounded-full bg-primary text-primary-foreground disabled:opacity-40 transition-colors"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TusharAIChat;
