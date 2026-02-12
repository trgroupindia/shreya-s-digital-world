import FloatingHearts from "@/components/FloatingHearts";
import Hero from "@/components/Hero";
import LoveLetter from "@/components/LoveLetter";
import Gallery from "@/components/Gallery";
import SongDedication from "@/components/SongDedication";
import Timeline from "@/components/Timeline";
import LoveCounter from "@/components/LoveCounter";
import Surprise from "@/components/Surprise";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <FloatingHearts />
      <Hero />
      <LoveLetter />
      <Gallery />
      <SongDedication />
      <Timeline />
      <LoveCounter />
      <Surprise />

      {/* Footer */}
      <footer className="relative z-10 py-10 text-center font-body text-sm text-muted-foreground">
        <p>Made with ❤️ by Tushar</p>
        <p className="mt-1 text-xs opacity-60">For the most special person in my life</p>
      </footer>
    </div>
  );
};

export default Index;
