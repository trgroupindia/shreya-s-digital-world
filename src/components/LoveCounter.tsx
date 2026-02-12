import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const START_DATE = new Date("2024-01-15"); // Adjust as needed

const useCountUp = (target: number, inView: boolean, duration = 2000) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
};

const LoveCounter = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const now = new Date();
  const diffMs = now.getTime() - START_DATE.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  const daysCount = useCountUp(days, inView);
  const hoursCount = useCountUp(days * 3, inView); // mock: 3 hours/day talking
  const messagesCount = useCountUp(days * 47, inView); // mock: 47 msgs/day

  const stats = [
    { value: daysCount, label: "Days Together", icon: "💕" },
    { value: hoursCount, label: "Hours Talked", icon: "🕐" },
    { value: messagesCount, label: "Messages Shared", icon: "💬" },
  ];

  return (
    <section className="relative px-4 py-20">
      <div className="hero-gradient absolute inset-0 opacity-30" />
      <motion.h2
        className="font-display text-3xl sm:text-4xl font-bold text-center text-foreground mb-12 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        💖 Our Love In Numbers
      </motion.h2>

      <div ref={ref} className="relative z-10 mx-auto grid max-w-3xl grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            className="glass-card rounded-2xl p-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
          >
            <span className="text-4xl">{s.icon}</span>
            <p className="font-display text-4xl sm:text-5xl font-bold text-primary mt-3">
              {s.value.toLocaleString()}
            </p>
            <p className="font-body text-sm text-muted-foreground mt-2">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LoveCounter;
