import { motion } from "framer-motion";
import { MessageCircle, Heart, Zap, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  color: string;
  action: () => void;
}

const DashboardNavigation = ({ onScrollToChat }: { onScrollToChat?: () => void }) => {
  const navigate = useNavigate();

  const navItems: NavItem[] = [
    {
      label: "AI Chat",
      icon: <MessageCircle className="w-4 h-4" />,
      color: "from-pink-500 to-rose-500",
      action: () => onScrollToChat?.(),
    },
    {
      label: "Love Stats",
      icon: <Heart className="w-4 h-4" />,
      color: "from-cyan-500 to-blue-500",
      action: () => {
        window.scrollTo({ top: document.body.scrollHeight / 2, behavior: "smooth" });
      },
    },
    {
      label: "Surprise",
      icon: <Zap className="w-4 h-4" />,
      color: "from-yellow-500 to-orange-500",
      action: () => navigate("/forever"),
    },
    {
      label: "Logout",
      icon: <LogOut className="w-4 h-4" />,
      color: "from-slate-600 to-slate-700",
      action: () => navigate("/login"),
    },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-40"
    >
      <div className="flex items-center gap-2 px-4 py-3 rounded-full backdrop-blur-md bg-slate-900/40 border border-pink-400/20 shadow-xl hover:border-pink-400/40 transition-all duration-300">
        {navItems.map((item, index) => (
          <motion.button
            key={item.label}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={item.action}
            className="group relative px-4 py-2 flex items-center gap-2 text-sm font-medium text-white transition-all duration-300"
          >
            {/* Hover glow background */}
            <motion.div
              className={`absolute inset-0 rounded-full bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-20 transition-all duration-300 blur-md -z-10`}
            />

            {/* Icon */}
            <motion.div
              className={`${
                item.label === "Logout" ? "text-slate-400" : "text-white"
              } group-hover:drop-shadow-[0_0_8px_currentColor] transition-all`}
            >
              {item.icon}
            </motion.div>

            {/* Label - hidden on mobile */}
            <span className="hidden sm:inline text-xs">{item.label}</span>

            {/* Neon underline on hover */}
            <motion.div
              className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${item.color} rounded-full`}
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
              style={{ transformOrigin: "left" }}
            />
          </motion.button>
        ))}
      </div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/20 to-cyan-500/20 blur-2xl -z-10"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </motion.nav>
  );
};

export default DashboardNavigation;
