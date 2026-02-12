import { motion } from "framer-motion";

const milestones = [
  { icon: "💬", title: "First Chat", desc: "The conversation that started it all" },
  { icon: "📞", title: "First Call", desc: "Hearing your voice for the first time" },
  { icon: "❤️", title: "Forever Promise", desc: "And the story continues…" },
];

const Timeline = () => {
  return (
    <section className="relative px-4 py-20">
      <motion.h2
        className="font-display text-3xl sm:text-4xl font-bold text-center text-foreground mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        🕰 Our Story
      </motion.h2>

      <div className="relative mx-auto max-w-2xl">
        {/* Vertical line */}
        <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-0.5 bg-rose-light sm:-translate-x-0.5" />

        {milestones.map((m, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.div
              key={i}
              className={`relative flex items-start mb-12 ${
                isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
              } flex-row`}
              initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              {/* Heart dot */}
              <div className="absolute left-6 sm:left-1/2 w-4 h-4 -translate-x-1/2 bg-primary rounded-full border-4 border-rose-light z-10 mt-2" />

              {/* Content */}
              <div
                className={`ml-14 sm:ml-0 sm:w-[calc(50%-2rem)] ${
                  isLeft ? "sm:pr-8 sm:text-right" : "sm:pl-8 sm:text-left"
                }`}
              >
                <div className="glass-card rounded-xl p-5">
                  <span className="text-2xl">{m.icon}</span>
                  <h3 className="font-display text-lg font-semibold text-foreground mt-1">
                    {m.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mt-1">{m.desc}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Timeline;
