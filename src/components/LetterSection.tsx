import { motion } from "framer-motion";

const LetterSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="h-full overflow-y-auto px-6 py-8"
    >
      <h2 className="text-2xl font-display text-foreground mb-1">A Letter For You</h2>
      <p className="text-xs text-muted-foreground mb-6">From Tushar, with all his heart</p>

      <div className="space-y-4 text-sm leading-relaxed text-foreground/80 font-body">
        <p>Dear Shreya ❤️,</p>

        <p>
          Pata hai, pehle mujhe lagta tha ki pyaar sirf filmon mein hota hai — woh slow motion scenes,
          wo background music, wo perfectly timed confessions. But phir tujhse baat hona shuru hua,
          aur mujhe laga ki real life mein toh aur bhi zyada magical hota hai.
        </p>

        <p>
          25 January ko jab humne pehli baar baat ki thi, tab mujhe nahi pata tha ki yeh conversation
          meri duniya badal degi. Par dheere dheere, har ek message ke saath, har ek snap ke saath,
          tum meri duniya ban gayi.
        </p>

        <p>
          Woh 3 January ki call yaad hai? 3 ghante ki. Mujhe woh har ek second yaad hai.
          Teri hasi, tere random thoughts, tera silence bhi — sab kuch special tha.
          Main toh bas sun raha tha aur soch raha tha ki kitna lucky hoon.
        </p>

        <p>
          Main jaanta hoon ki hum abhi jaldi mein nahi hai. Koi rush nahi hai. Bas yeh jo hai na,
          yeh feeling — yeh sach hai. Aur main chahta hoon ki tujhe hamesha safe feel ho mere saath.
        </p>

        <p>
          Tujhe pata hai kya sabse accha lagta hai? Jab subah snap aata hai tera, toh mera din ban jaata hai.
          Literally. Chahe raat ko kitni bhi der se soya hoon, tera snap dekh ke energy aa jaati hai.
        </p>

        <p>
          I don't know what the future holds, Shreya. But I know one thing for sure —
          jab tak tu hai, mujhe kisi aur cheez ki zaroorat nahi.
        </p>

        <p>
          Tu special hai. Not because I say so. But because you truly are.
          And I'll keep reminding you of that, every single day.
        </p>

        <p className="mt-6">
          Forever yours,<br />
          <span className="font-display text-primary text-base">Tushar ❤️</span>
        </p>
      </div>
    </motion.div>
  );
};

export default LetterSection;
