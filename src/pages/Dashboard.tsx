import { motion } from "framer-motion";
import FloatingHearts from "@/components/FloatingHearts";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="hero-gradient absolute inset-0 z-0" />
      <FloatingHearts count={25} />

      {/* Welcome banner */}
      <motion.div
        className="relative z-10 pt-12 pb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="font-display text-2xl sm:text-3xl text-foreground">
          Welcome to our little world, Shreya ❤️
        </p>
      </motion.div>

      {/* Content cards */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 grid gap-6 sm:grid-cols-2">
        {[
          { icon: "💌", title: "Love Letter", desc: "Read the letter I wrote for you", path: "/#love-letter" },
          { icon: "📸", title: "Cutie Pie Gallery", desc: "Our precious memories together", path: "/#gallery" },
          { icon: "🎵", title: "Our Song", desc: "The music that reminds me of you", path: "/#song" },
          { icon: "💍", title: "Forever", desc: "A secret just for you", path: "/forever" },
        ].map((card, i) => (
          <motion.div
            key={card.title}
            className="glass-card rounded-2xl p-6 cursor-pointer group"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
            whileHover={{ scale: 1.03, y: -4 }}
            onClick={() => navigate(card.path)}
          >
            <span className="text-4xl block mb-3 group-hover:scale-110 transition-transform">{card.icon}</span>
            <h3 className="font-display text-xl font-semibold text-foreground mb-1">{card.title}</h3>
            <p className="font-body text-sm text-muted-foreground">{card.desc}</p>
          </motion.div>
        ))}
      </div>

      <footer className="relative z-10 py-10 text-center font-body text-sm text-muted-foreground">
        <p>Made with ❤️ by Tushar</p>
      </footer>
    </div>
  );
};

export default Dashboard;
