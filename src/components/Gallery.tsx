import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import s1 from "@/assets/shreya-1.png";
import s2 from "@/assets/shreya-2.png";
import s3 from "@/assets/shreya-3.png";
import s4 from "@/assets/shreya-4.jpg";
import m1 from "@/assets/memory-1.jpg";
import m2 from "@/assets/memory-2.jpg";
import m3 from "@/assets/memory-3.jpg";
import m4 from "@/assets/memory-4.jpg";
import m5 from "@/assets/memory-5.jpg";
import m6 from "@/assets/memory-6.jpg";

const images = [
  { src: s1, caption: "My cutie pie 🥰" },
  { src: s2, caption: "That adorable look 💫" },
  { src: s3, caption: "Those beautiful eyes ✨" },
  { src: s4, caption: "Gorgeous as always 💖" },
  { src: m1, caption: "The moment everything changed 💫" },
  { src: m2, caption: "Roses that remind me of you 🌹" },
  { src: m3, caption: "Our dreamy sunsets 🌅" },
  { src: m4, caption: "Coffee dates & endless talks ☕" },
  { src: m5, caption: "Words only you understand 💌" },
  { src: m6, caption: "You are my universe ✨" },
];

const Gallery = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="relative px-4 py-20">
      <motion.h2
        className="font-display text-3xl sm:text-4xl font-bold text-center text-foreground mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        📸 Cutie Pie Gallery
      </motion.h2>

      <div className="mx-auto max-w-5xl columns-2 sm:columns-3 gap-4 space-y-4">
        {images.map((img, i) => (
          <motion.div
            key={i}
            className="relative cursor-pointer overflow-hidden rounded-xl break-inside-avoid group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setSelected(i)}
          >
            <img
              src={img.src}
              alt={img.caption}
              className="w-full rounded-xl transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 rounded-xl bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ boxShadow: "inset 0 0 30px hsl(340 65% 55% / 0.2)" }} />
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="glass-card rounded-2xl p-3 max-w-lg w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[selected].src}
                alt={images[selected].caption}
                className="w-full rounded-xl"
              />
              <p className="font-body text-center text-foreground/80 mt-4 mb-2 text-sm sm:text-base">
                {images[selected].caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
