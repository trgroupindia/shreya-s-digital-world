import { motion } from "framer-motion";
import { Music } from "lucide-react";

const SongDedication = () => {
  return (
    <section className="relative flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
      <div className="hero-gradient absolute inset-0 opacity-30" />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-8 max-w-xl w-full"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground text-center">
          🎵 A Song For You
        </h2>

        {/* Vinyl record */}
        <div className="relative w-40 h-40 sm:w-52 sm:h-52">
          <div className="absolute inset-0 rounded-full bg-foreground/90 animate-spin-slow flex items-center justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/80 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-primary-foreground" />
            </div>
            {/* Grooves */}
            {[30, 40, 50, 60, 70].map((s) => (
              <div
                key={s}
                className="absolute rounded-full border border-foreground/20"
                style={{ width: `${s}%`, height: `${s}%` }}
              />
            ))}
          </div>
        </div>

        {/* Equalizer */}
        <div className="flex items-end gap-1 h-8">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 rounded-full bg-primary"
              style={{
                animation: `equalizer ${0.5 + Math.random() * 0.5}s ease-in-out ${Math.random() * 0.3}s infinite alternate`,
                height: "8px",
              }}
            />
          ))}
        </div>

        <p className="font-display italic text-lg sm:text-xl text-muted-foreground text-center">
          "This song reminds me of you…"
        </p>

        <div className="glass-card rounded-2xl p-4 w-full">
          <div className="aspect-video w-full rounded-xl overflow-hidden">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/bx1Bh8ZvH84?si=xp7KRJbC"
              title="Romantic Song"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground font-body text-sm">
          <Music size={16} />
          <span>Play this while reading the rest…</span>
        </div>
      </motion.div>
    </section>
  );
};

export default SongDedication;
