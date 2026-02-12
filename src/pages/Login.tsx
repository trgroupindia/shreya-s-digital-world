import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FloatingHearts from "@/components/FloatingHearts";
import { Input } from "@/components/ui/input";

const VALID_EMAIL = "shreya@tushar.in";
const VALID_PASSWORD = "Shreya@2026";
const VALID_OTP = "250126";

const Login = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"password" | "otp">("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [typed, setTyped] = useState("");
  const [shake, setShake] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const fullText = "Welcome, Shreya ❤️";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const triggerError = useCallback((msg: string) => {
    setError(msg);
    setShake(true);
    setTimeout(() => setShake(false), 600);
  }, []);

  const triggerSuccess = useCallback((msg: string) => {
    setSuccess(true);
    setConfetti(true);
    setError("");
    setTimeout(() => {
      navigate("/dashboard");
    }, 2500);
  }, [navigate]);

  const handlePasswordLogin = () => {
    setLoading(true);
    setError("");
    setTimeout(() => {
      setLoading(false);
      if (email === VALID_EMAIL && password === VALID_PASSWORD) {
        triggerSuccess("I was waiting for you…");
      } else {
        triggerError("Only someone special can enter ❤️");
      }
    }, 1500);
  };

  const handleOtpLogin = () => {
    setLoading(true);
    setError("");
    const code = otp.join("");
    setTimeout(() => {
      setLoading(false);
      if (code === VALID_OTP) {
        triggerSuccess("You unlocked my heart 💖");
      } else {
        triggerError("Wrong code… try again ❤️");
      }
    }, 1500);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`);
      prev?.focus();
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="hero-gradient absolute inset-0 z-0" />
      <FloatingHearts count={success ? 40 : 20} />

      {/* Confetti */}
      <AnimatePresence>
        {confetti && (
          <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
            {Array.from({ length: 60 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-lg"
                initial={{
                  x: "50vw",
                  y: "50vh",
                  scale: 0,
                  rotate: 0,
                }}
                animate={{
                  x: `${Math.random() * 100}vw`,
                  y: `${Math.random() * 100}vh`,
                  scale: [0, 1.5, 1],
                  rotate: Math.random() * 720 - 360,
                  opacity: [1, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 0.5,
                  ease: "easeOut",
                }}
              >
                {["💖", "✨", "💕", "🌹", "💗", "❤️"][i % 6]}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Success overlay */}
      <AnimatePresence>
        {success && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-background/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <motion.div
              className="text-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.6 }}
            >
              <motion.span
                className="text-7xl block mb-4"
                animate={{
                  scale: [1, 1.3, 1],
                }}
                transition={{ repeat: Infinity, duration: 1.2 }}
              >
                💖
              </motion.span>
              <p className="font-display text-2xl sm:text-3xl text-foreground">
                {mode === "otp" ? "You unlocked my heart 💖" : "I was waiting for you…"}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Card */}
      <motion.div
        className={`glass-card relative z-10 w-full max-w-md mx-4 rounded-2xl p-8 sm:p-10 ${shake ? "animate-shake" : ""}`}
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", damping: 20 }}
      >
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground min-h-[1.3em]">
            {typed}
            <span className="inline-block w-[3px] h-[0.8em] bg-primary ml-1 align-middle animate-[typewriter-cursor_1s_infinite]" />
          </h1>
          <motion.p
            className="font-body text-muted-foreground mt-3 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            This world is reserved only for you.
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {mode === "password" ? (
            <motion.div
              key="password"
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: -90 }}
              transition={{ duration: 0.4 }}
            >
              {/* Email */}
              <div className="mb-4">
                <label className="font-body text-sm text-muted-foreground block mb-1.5">Email</label>
                <Input
                  type="email"
                  placeholder="shreya@tushar.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background/50 border-rose-light focus:ring-primary focus:border-primary"
                />
              </div>

              {/* Password */}
              <div className="mb-6">
                <label className="font-body text-sm text-muted-foreground block mb-1.5">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-background/50 border-rose-light focus:ring-primary focus:border-primary"
                  onKeyDown={(e) => e.key === "Enter" && handlePasswordLogin()}
                />
              </div>

              {/* Submit */}
              <motion.button
                onClick={handlePasswordLogin}
                disabled={loading || success}
                className="glow-button w-full rounded-full py-3 font-body text-base font-medium text-primary-foreground disabled:opacity-60"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="inline-block"
                    >
                      ❤️
                    </motion.span>
                    Unlocking…
                  </span>
                ) : (
                  "Unlock My Heart ❤️"
                )}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="otp"
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: -90 }}
              transition={{ duration: 0.4 }}
            >
              <p className="font-body text-sm text-muted-foreground text-center mb-6">
                Enter the magic code to unlock 💫
              </p>

              {/* OTP Boxes */}
              <div className="flex justify-center gap-2 sm:gap-3 mb-6">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value.replace(/\D/g, ""))}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className="w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-display font-bold rounded-lg border border-rose-light bg-background/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  />
                ))}
              </div>

              {/* Submit */}
              <motion.button
                onClick={handleOtpLogin}
                disabled={loading || success || otp.join("").length < 6}
                className="glow-button w-full rounded-full py-3 font-body text-base font-medium text-primary-foreground disabled:opacity-60"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="inline-block"
                    >
                      💖
                    </motion.span>
                    Verifying…
                  </span>
                ) : (
                  "Unlock My Heart ❤️"
                )}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.p
              className="font-body text-sm text-destructive text-center mt-4"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Toggle */}
        <motion.button
          onClick={() => { setMode(mode === "password" ? "otp" : "password"); setError(""); }}
          className="block mx-auto mt-6 font-body text-sm text-primary hover:text-primary/80 transition-colors"
          whileHover={{ scale: 1.05 }}
        >
          {mode === "password" ? "Login with Magic Code ✨" : "Login with Email & Password 💌"}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Login;
