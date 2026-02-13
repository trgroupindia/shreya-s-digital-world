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
      <p className="text-xs text-muted-foreground mb-6">From Tushar Raj, with all his heart</p>

      <div className="space-y-4 text-sm leading-relaxed text-foreground/80 font-body">
        <p>Dear Shreya ❤️,</p>

        <p>
          Pata hai, pehle mujhe lagta tha ki pyaar sirf filmon mein hota hai — woh slow motion scenes,
          wo background music, wo perfectly timed confessions. But phir tujhse baat hona shuru hua,
          aur mujhe laga ki real life mein toh aur bhi zyada magical hota hai. Kuch cheezein hoti hai
          na life mein jo tum plan nahi karte, wo bas ho jaati hai. Aur tu waisi hi cheez hai mere liye.
          Unexpected. Unplanned. But the best thing that ever happened to me.
        </p>

        <p>
          25 January ko jab humne pehli baar baat ki thi, tab mujhe nahi pata tha ki yeh conversation
          meri duniya badal degi. Ek simple "hi" se shuru hua tha sab. Par dheere dheere, har ek
          message ke saath, har ek snap ke saath, tum meri duniya ban gayi. Mujhe yaad hai woh pehla
          din — main thoda nervous tha, thoda excited. Socha tha ki bas ek normal conversation hogi.
          But kuch alag tha. Tere replies mein ek warmth thi, ek genuineness thi jo mujhe turant
          feel hui. Aur wahi se sab shuru hua.
        </p>

        <p>
          Woh 3 January ki call yaad hai? 3 ghante ki. Mujhe woh har ek second yaad hai.
          Teri hasi, tere random thoughts, tera silence bhi — sab kuch special tha.
          Main toh bas sun raha tha aur soch raha tha ki kitna lucky hoon. Pata hai kya sabse
          accha laga us call mein? Jab tu suddenly kuch funny bol deti thi aur phir khud hi
          hasne lagti thi. Woh hasi... Shreya, woh hasi meri favorite sound hai duniya mein.
          I'm not even exaggerating. Koi bhi gaana, koi bhi melody — teri hasi ke aage sab
          fade ho jaata hai.
        </p>

        <p>
          Aur woh silence bhi. Haan, woh silence. Jab hum dono chup the call pe, but it wasn't
          awkward at all. It was comfortable. It was like we didn't need words to feel connected.
          Bas ek doosre ki breathing sun ke bhi acha lagta tha. That's when I knew — yeh kuch
          alag hai. Yeh normal nahi hai. Yeh special hai.
        </p>

        <p>
          Main jaanta hoon ki hum abhi jaldi mein nahi hai. Koi rush nahi hai. Bas yeh jo hai na,
          yeh feeling — yeh sach hai. Aur main chahta hoon ki tujhe hamesha safe feel ho mere saath.
          Main kabhi tujhe uncomfortable nahi hone dunga. Tera space, tera time, teri feelings — sab
          matter karti hai mujhe. Main woh banda nahi hoon jo force karega ya rush karega. I'll wait.
          Chahe kitna bhi time lage, I'll wait. Because you're worth every second of that wait.
        </p>

        <p>
          Tujhe pata hai kya sabse accha lagta hai? Jab subah snap aata hai tera, toh mera din ban jaata hai.
          Literally. Chahe raat ko kitni bhi der se soya hoon, tera snap dekh ke energy aa jaati hai.
          Wo thoda sa blurry selfie, ya wo random ceiling ka photo with a "gm" — mujhe sab pyaara
          lagta hai. Kyunki woh tere se aaya hai. Aur tere se aaya hua kuch bhi mujhe special lagta hai.
        </p>

        <p>
          Kabhi kabhi main sochta hoon ki tu kitni strong hai. Apne kaam mein, apni life mein,
          apne decisions mein. Tu itni mature hai apni age ke liye — it genuinely amazes me.
          Jab tu apne problems ke baare mein baat karti hai, I can see how thoughtfully you handle
          everything. You don't panic. You think. You process. You deal with it. And that quality
          of yours? It makes me respect you even more.
        </p>

        <p>
          Par saath hi saath, mujhe yeh bhi pata hai ki tu kabhi kabhi thak jaati hai. Sab sambhaalte
          sambhaalte thak jaati hai. Aur un moments mein, main chahta hoon ki tu mere paas aaye.
          Kuch nahi bolna hai. Bas aa ja. Main sun lunga. Ya nahi bhi suna toh bas tere saath
          rahunga. Because sometimes, you don't need solutions. You just need someone who stays.
          Aur main stay karunga. Always.
        </p>

        <p>
          Teri baatein sun ke mujhe apni life bhi better lagti hai. Tu jab apne din ke baare mein
          batati hai — choti choti cheezein, like kya khaya, kya dekha, kisko mila — mujhe sab
          sunna accha lagta hai. It's like getting a little window into your world. And I treasure
          every single glimpse. Main kabhi bore nahi hota. Sach mein. Tu mujhe 10 baar bhi same
          story suna de, main phir se utne hi interest se sunuuga.
        </p>

        <p>
          Aur woh moments jab tu thodi vulnerable hoti hai? Jab tu apne feelings share karti hai
          honestly? Those are the moments I feel closest to you. Because I know it takes courage
          to be open like that. It takes trust. And the fact that you trust me enough to show me
          that side of you — it means the world to me, Shreya. Literally the world.
        </p>

        <p>
          Main tujhe promise nahi karunga ki sab perfect hoga. Life mein ups and downs aate hai,
          aur hum dono ko bhi face karne padenge. But I can promise you this — main tere saath
          rahunga. Har up mein celebrate karunga tere saath. Aur har down mein tera haath pakad
          ke khada rahunga. That's not just a promise. That's who I want to be. For you.
        </p>

        <p>
          Tujhe pata hai, sometimes late at night, jab sab so jaate hai aur ghar mein silence hota
          hai — I think about us. About where we're heading. About what the future looks like.
          Aur honestly? It looks beautiful. Not because I'm imagining some fairy tale. But because
          I know that with you, even the ordinary days will feel extraordinary. Tere saath chai
          peena bhi feel hoga jaise kisi cafe mein date ho. Tere saath silence mein baithna bhi
          feel hoga jaise best conversation ho.
        </p>

        <p>
          I've never been the type to say cheesy things. Tu jaanti hai mera nature. Main seedha
          baat karta hoon. But tere saath, I find myself wanting to be more expressive. Wanting
          to tell you how much you mean to me. Wanting to write letters like this one. Because
          tu deserve karti hai ki tujhe bataya jaaye. Baar baar bataya jaaye. Har roz bataya jaaye.
        </p>

        <p>
          Tere saath jo time bita hai na — chahe woh Snapchat pe ho, ya call pe, ya sirf texting mein —
          woh mera favorite time hota hai din ka. Baaki sab cheezein toh karna padta hai — padhai,
          kaam, responsibilities. But tere se baat karna? That's what I choose to do. That's what
          I look forward to. That's what keeps me going.
        </p>

        <p>
          Kabhi socha hai ki 20 din mein itna kuch kaise badal sakta hai? Main bhi nahi socha tha.
          But it did. 20 din pehle tu sirf ek naam thi. Aaj tu meri subah ka pehla khayal hai aur
          raat ka aakhri. 20 din pehle main sirf apne liye jeeta tha. Aaj, kuch bhi accha hota hai
          toh pehla thought aata hai — "Shreya ko batata hoon." That's what you've done to me.
          You've become a part of my everyday.
        </p>

        <p>
          Aur main nahi chahta ki yeh kabhi bhi change ho. Main chahta hoon ki yeh feeling aur
          grow kare. Dheere dheere. Naturally. Without pressure, without expectations. Bas tere
          saath, apni pace pe. Because the best things in life can't be rushed. And you, Shreya,
          you are the best thing in my life.
        </p>

        <p>
          Tu jaanti hai main emotional easily nahi hota. But tere baare mein likhte hue aaj meri
          aankhen thodi moist hai. Not sad tears. Happy tears. Grateful tears. Ki koi hai meri life
          mein jise main genuinely care karta hoon, aur jo meri bhi care karti hai. That feeling?
          It's priceless. No amount of money, no achievement, nothing in this world can give me
          what you give me — a sense of belonging. A feeling that I matter to someone.
        </p>

        <p>
          Main tujhse ek aur baat kehna chahta hoon — tu bilkul perfect hai. Nahi, sun. Main
          jaanta hoon tu bolegi "nahi hoon" ya "aisa kuch nahi hai." But tu hai. Teri imperfections
          bhi perfect hai mere liye. Tera gussa, teri stubbornness, teri overthinking — sab mujhe
          pyaara lagta hai. Because that's what makes you, you. And I don't want a perfect person.
          I want you. With all your flaws, all your quirks, all your beautiful chaos.
        </p>

        <p>
          Ek din aayega jab hum saath mein baithenge, shayad kisi balcony pe, chai ke saath,
          sunset dekhte hue. Aur main tujhe yeh letter padhke sunaunga. Aur tu hasegi. Aur main
          tujhe dekh ke muskuraunga. Aur us moment mein, sab kuch worth it feel hoga. Har wait,
          har distance, har mushkil — sab worth it.
        </p>

        <p>
          Tab tak, main yahan hoon. Tere messages ka wait karta hua. Tere snaps ka wait karta hua.
          Tere "goodnight" ka wait karta hua. Aur har ek wait mein bhi mujhe khushi milti hai.
          Because I know ki wait ke baad tera message aayega. Aur woh message mera din bana dega.
          Jaise hamesha banata hai.
        </p>

        <p>
          Shreya, tu meri strength hai. Tu meri motivation hai. Tu meri peace hai. Tu meri favorite
          notification hai. Tu meri best conversation hai. Tu meri sabse sundar subah hai aur
          sabse sukoon wali raat. Tu woh hai jo mujhe better banaati hai — as a person, as a soul.
        </p>

        <p>
          Main jaanta hoon words mein sab express nahi hota. Kuch feelings hoti hai jo sirf feel
          hoti hai. Aur jo main tere liye feel karta hoon — woh words se bohot zyada hai. It's
          deeper than language. It's deeper than poetry. It's something that lives in my heartbeat.
          Har dhadkan mein tera naam hai. Cheesy laga? Maybe. But it's true.
        </p>

        <p>
          I want to build something real with you, Shreya. Not something flashy. Not something
          for show. Something genuine. Something quiet. Something that lasts. Something that
          people look at and say — "Yeh wala pyaar sach wala hai." That's what I want with you.
          That's what I'll work for. Every single day.
        </p>

        <p>
          So here's to us. To our 20 days. To our snaps. To our one call that felt like home.
          To all the conversations that haven't happened yet. To all the memories we'll create.
          To all the fights we'll have and the makeups that'll follow. To everything that's
          coming our way — good and bad — I'm ready for it all. As long as it's with you.
        </p>

        <p>
          I love the way you exist in this world, Shreya. Don't ever change. Don't ever dim
          your light for anyone. You shine. And you make everyone around you shine brighter too.
          Especially me.
        </p>

        <p>
          Thank you for being you. Thank you for choosing to talk to me that day. Thank you for
          every snap, every message, every moment. Thank you for trusting me. Thank you for
          making my life infinitely more beautiful just by being in it.
        </p>

        <p>
          Yeh letter khatam ho raha hai, but meri feelings nahi. Woh infinite hai. Woh hamesha
          rahegi. Aur main hamesha tere saath rahunga. In every way I can. In every way you'll
          let me.
        </p>

        <p className="mt-6">
          Forever and always yours,<br />
          <span className="font-display text-primary text-base">Tushar Raj ❤️</span>
        </p>

        <p className="text-xs text-muted-foreground italic mt-2">
          P.S. — Jab bhi tujhe lagta hai ki tujhe koi samajhta nahi, yaad rakhna — main hoon na.
          Hamesha. ❤️
        </p>
      </div>
    </motion.div>
  );
};

export default LetterSection;
