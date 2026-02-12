# 🚀 Setup Guide - Futuristic AI Dashboard

Complete setup instructions for the romantic AI dashboard.

---

## ✅ Prerequisites

- Node.js 18+ or Bun runtime
- npm, yarn, or bun package manager
- Modern browser (Chrome, Safari, Firefox, Edge)

---

## 📦 Installation

### 1. Install Dependencies

```bash
# Using Bun (recommended for this project)
bun install

# OR using npm
npm install

# OR using yarn
yarn install
```

### 2. Install OpenAI (if using real AI responses)

```bash
# Using Bun
bun add openai

# OR using npm
npm install openai
```

---

## ⚙️ Configuration

### 1. Environment Variables

Create a `.env.local` file in the root directory:

```env
# OpenAI API Key (optional - for real AI responses)
VITE_OPENAI_API_KEY=sk_your_api_key_here

# API Endpoint (if using backend)
VITE_API_URL=http://localhost:3000
VITE_API_KEY=your_backend_key

# Feature Flags
VITE_ENABLE_VOICE_NOTES=true
VITE_ENABLE_AI_CHAT=true
VITE_ENABLE_MUSIC_PLAYER=false
```

### 2. Dashboard Configuration

Edit [DASHBOARD_SETUP.md](./DASHBOARD_SETUP.md) to customize:
- Tushar AI personality and responses
- Memory milestones and dates
- Song database by mood
- Voice note details
- Color scheme

---

## 🏃 Running the Project

### Development Server

```bash
# Using Bun
bun run dev

# OR using npm
npm run dev

# OR using yarn
yarn dev
```

The dashboard will be available at `http://localhost:5173`

### Production Build

```bash
# Build
bun run build
# or
npm run build

# Preview
bun run preview
# or
npm run preview
```

---

## 🔐 API Integration

### Option A: Offline Mode (Default)
- Works without OpenAI API
- Uses pre-programmed responses
- No configuration needed
- Perfect for development/demo

### Option B: OpenAI Integration
1. Get API key from [OpenAI Platform](https://platform.openai.com)
2. Add to `.env.local`:
   ```env
   VITE_OPENAI_API_KEY=sk_your_key_here
   ```
3. See [OPENAI_INTEGRATION.md](./OPENAI_INTEGRATION.md) for implementation

### Option C: Custom Backend
1. Create backend API endpoint for `/api/chat`
2. Configure in `.env.local`:
   ```env
   VITE_API_URL=https://your-api.com
   ```
3. See [OPENAI_INTEGRATION.md](./OPENAI_INTEGRATION.md) for examples

---

## 🎨 Customization

### Change Colors
Edit [src/App.css](./src/App.css):
```css
/* Change primary pink to custom color */
--primary-pink: #ff1493;
--primary-rose: #ff69b4;
```

Or update Tailwind classes in components:
```tsx
// Change pink-500 to your color throughout components
className="bg-gradient-to-r from-pink-500 to-rose-500"
```

### Change Personality
Edit [src/components/TusharAIChat.tsx](./src/components/TusharAIChat.tsx):

```typescript
const responses: Record<string, string[]> = {
  happy: [
    "Your custom happy response here ❤️",
    "Another happy response..."
  ],
  // ... more moods
};
```

### Add Memory Dates
Edit [src/components/TusharAIChat.tsx](./src/components/TusharAIChat.tsx):

```typescript
if (userMessage.toLowerCase().includes("first talk")) {
  return "Shreya ❤️, that was on YOUR_DATE here...";
}
```

### Add/Remove Features
In [src/pages/Dashboard.tsx](./src/pages/Dashboard.tsx), comment out sections:

```tsx
{/* Remove by commenting out */}
{/* <EmotionScanner /> */}
```

---

## 📱 Responsive Testing

### Test Different Breakpoints

```bash
# In browser DevTools:
# Desktop (1024px+)
# Tablet (768px - 1023px)
# Mobile (320px - 767px)
```

Key responsive breakpoints used:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

---

## 🧪 Testing

### Run Tests
```bash
bun run test
# or
npm run test
```

### Watch Mode
```bash
bun run test:watch
# or
npm run test:watch
```

### ESLint
```bash
bun run lint
# or
npm run lint
```

---

## 🔍 Debugging

### Check Browser Console
Open DevTools (F12) and check for:
- Component render errors
- Missing assets
- API call failures
- Animation issues

### Enable React DevTools
1. Install [React DevTools](https://react-devtools-tutorial.vercel.app/)
2. Inspect component props and state
3. Check animation frames

### Debug Animations
```javascript
// In console, check Framer Motion version
import { motion } from 'framer-motion'
console.log(motion.version)

// Check if animations are running
console.log('Animation FPS:', performance.now())
```

---

## ⚡ Performance Tips

### Optimization Checklist
- [ ] Lazy load components
- [ ] Reduce animation count on mobile
- [ ] Use `will-change` CSS property
- [ ] Optimize images (should be SVG for icons)
- [ ] Use React.memo for heavy components
- [ ] Enable hardware acceleration

### Check Performance
```bash
# Lighthouse audit
bun run build && npm run preview
# Open http://localhost:4173 and run Lighthouse audit
```

### Profile Animations
```javascript
// In console
performance.mark('animation-start');
// ... run animation
performance.mark('animation-end');
performance.measure('animation', 'animation-start', 'animation-end');
```

---

## 🚨 Troubleshooting

### Issue: White screen on load
**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules bun.lockb
bun install
bun run dev
```

### Issue: Animations not smooth
**Solution:**
- Check browser performance (DevTools > Performance)
- Reduce particle count in `Dashboard.tsx`
- Use `transform` and `opacity` only (faster than `width`, `height`)

### Issue: API not responding
**Solution:**
```bash
# Check console for errors
# Verify API key in .env.local
# Confirm endpoint is reachable
curl $VITE_OPENAI_API_KEY
```

### Issue: Tailwind classes not applying
**Solution:**
```bash
# Rebuild Tailwind
npx tailwindcss -i ./src/index.css -o ./src/output.css

# OR clear cache
rm -rf .next node_modules
bun install
```

---

## 📚 File Structure Reference

```
/
├── src/
│   ├── pages/
│   │   ├── Dashboard.tsx      ⭐ Main dashboard
│   │   ├── Forever.tsx        🌹 Secret page
│   │   ├── Index.tsx          Landing page
│   │   └── Login.tsx          Login page
│   │
│   ├── components/
│   │   ├── TusharAIChat.tsx   💬 AI chat (customize here)
│   │   ├── LoveEnergyPanel.tsx 💖 Stats panel
│   │   ├── SongRecommender.tsx 🎶 Song picker
│   │   ├── VoiceNotesLocker.tsx 🔐 Voice notes
│   │   ├── EmotionScanner.tsx 💖 Heart scanner
│   │   ├── CinematicActivation.tsx ✨ Entry animation
│   │   ├── DashboardNavigation.tsx 🧭 Nav bar
│   │   └── ui/               🎨 Shadcn components
│   │
│   ├── App.tsx               Main app
│   ├── App.css               🎨 Dashboard styles
│   └── main.tsx              Entry point
│
├── public/                   Static assets
├── vite.config.ts           Build config
├── tailwind.config.ts        Tailwind config
├── tsconfig.json            TypeScript config
├── package.json             Dependencies
├── DASHBOARD_SETUP.md        Feature docs
├── OPENAI_INTEGRATION.md     AI setup
└── README.md                Original readme
```

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set env variables in Vercel dashboard
# VITE_OPENAI_API_KEY=sk_...
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy

# Configure in netlify.toml:
[build]
  command = "bun run build"
  publish = "dist"

# Set environment variables in dashboard
```

### Deploy to GitHub Pages

```bash
# Update vite.config.ts
export default {
  base: '/shreya-s-digital-world/',
  // ...
}

# Deploy
npm run build
# Push dist/ to gh-pages branch
```

---

## 📋 Checklist Before Launch

- [ ] Dependencies installed (`bun install`)
- [ ] `.env.local` configured with API keys
- [ ] All components render without errors
- [ ] Animations run at 60fps
- [ ] Mobile responsive works (320px+)
- [ ] Login → Dashboard flow works
- [ ] Dashboard → Forever page works
- [ ] AI chat responds correctly
- [ ] Colors match design specification
- [ ] All images and assets load
- [ ] No console errors in production build
- [ ] Performance Lighthouse score > 80
- [ ] Security checked (no exposed keys)

---

## 🆘 Getting Help

### Resources
- [Vite Docs](https://vitejs.dev/)
- [React Docs](https://react.dev)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Shadcn/ui Components](https://ui.shadcn.com/)

### For Issues
1. Check the troubleshooting section above
2. Review error messages in console
3. Check the relevant documentation
4. Search GitHub issues

---

## 💡 Next Steps

1. **Development**: Run `bun run dev` and start customizing
2. **Personalization**: Update AI personality and memories
3. **Testing**: Test all features across devices
4. **Integration**: Add real OpenAI API if needed
5. **Deployment**: Deploy to production

---

## ❤️ Tips for Best Experience

✨ **For Shreya:**
- Personalize all memories and dates
- Update Tushar AI responses to feel authentic
- Add special songs and voice notes
- Keep the Forever page as a surprise

🎨 **For Developers:**
- Use browser DevTools to inspect animations
- Experiment with Framer Motion variants
- Customize Tailwind colors to your brand
- Extend components with new features

---

Made with 💕 by Tushar for Shreya

*"Every line of code is a heartbeat"*
