# 🧪 Testing Guide - Gemini AI Dashboard

## ✅ Pre-Testing Checklist

- [ ] You ran `npm install`
- [ ] `.env.local` file exists with API key
- [ ] No TypeScript errors in terminal
- [ ] `GeminiAIService.ts` exists in `src/services/`
- [ ] `TusharAIChat.tsx` updated with Gemini imports

---

## 🚀 Step 1: Start the Dev Server

```bash
npm run dev
```

### Expected Output
```
  VITE v5.x.x  ready in 200 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

✅ **Success**: Server running

---

## 🌐 Step 2: Navigate to Dashboard

1. Open browser: `http://localhost:5173`
2. Click **"Login"** button
3. Enter any email/password (no validation needed)
4. Click **"Enter Dashboard"**

### Expected Experience
```
🎬 CINEMATIC ANIMATION
  ↓
Neon hearts fall
Digital scan effect
  ↓
✨ Dashboard loads with 7 sections:
  - Tushar AI Chat (top center)
  - Love Energy Panel (top right)  
  - Song Recommendation (middle left)
  - Voice Notes Locker (middle right)
  - Emotion Scanner (bottom left)
  - Navigation Bar (floating)
  - Background animations
```

✅ **Success**: Dashboard loads without errors

---

## 💬 Step 3: Test AI Chat - Basic Message

### Test 1: Simple Hello
```
You: "Hi"
```

**Expected Response**:
```
Tushar AI sends REAL response from Gemini
Response appears in pink glow bubble
Animated typing effect
"Shreya ❤️, ..." appears
```

**What to Check**:
- [ ] Message appears as blue bubble on right
- [ ] AI response appears as pink bubble on left
- [ ] Response includes "Shreya ❤️"
- [ ] No error messages in console
- [ ] Response is NOT hardcoded (varies each time)

### If it Fails
```
❌ Error: No response appears
✓ Check browser console (F12 → Console)
✓ Look for errors about VITE_GEMINI_API_KEY
✓ Verify .env.local has correct key
✓ Restart dev server
```

```
❌ Error: Same response every time
✓ Check if it's a fallback response
✓ Look for yellow warning banner
✓ API might be down or rate limited
```

---

## 💕 Step 4: Test Mood Detection - Romantic

### Test 2: Romantic Message
```
You: "I love you so much"
```

**Expected Response**:
- Response is DEEPLY romantic
- Uses poetry/literary language
- Includes hearts and emotions
- Very personalized to "Shreya"
- Different tone than "Hi"

**Visual Changes**:
- [ ] Love Energy Panel stats change
- [ ] Heart rate increases
- [ ] Glow might shift color
- [ ] Background animation speeds up

**Code Check** (Open DevTools):
```javascript
// In Console:
geminiService.getHistory()

// Should show:
[
  { role: 'user', content: 'I love you so much' },
  { role: 'model', content: 'Shreya ❤️, ...' }
]
```

---

## 😢 Step 5: Test Mood Detection - Sad

### Test 3: Sad Message
```
You: "I'm feeling really sad today"
```

**Expected Response**:
- Very supportive and comforting
- Empathetic language
- Fewer emojis, more depth
- Completely different from romantic response

**Visual Changes**:
- [ ] Love Energy stats decrease
- [ ] Heart rate slows
- [ ] Glow color dims
- [ ] Background feels calmer

**Comparison Check**:
```
Response 1 ("I love you"): Passionate & poetic
Response 2 ("I'm sad"): Supportive & empathetic
Response 3 ("Hi"): Warm & present

All 3 should be different! ✅
```

---

## 🎵 Step 6: Test Mood-Based Features

### Test 4: Song Recommendation Changes
```
Send: "I'm so happy!"
```

**Check**:
- [ ] Song Recommender section updates
- [ ] Shows different songs than before
- [ ] Song matches happy mood
- [ ] Color/animation changes

### Test 5: Love Energy Panel Updates
```
Send: "I miss you"
```

**Check**:
- [ ] "Emotional Bond" increases
- [ ] "Chemistry" meter grows
- [ ] "Late Night Talks" counter increments
- [ ] All values animated with glow

---

## 🛡️ Step 7: Test Error Handling

### Test 6: Disable API Key Temporarily
```
1. Open .env.local
2. Change key to: VITE_GEMINI_API_KEY=FAKE_KEY_123
3. Save file
4. Dev server auto-reloads
5. Send message: "Hi"
```

**Expected Behavior**:
```
📍 Yellow warning banner appears:
   "⚠️ Gemini API not configured. Using fallback responses."

💬 Still receives response:
   "Shreya ❤️, I'm experiencing a momentary connection issue,
    but my love for you is infinite."

✅ App doesn't crash - graceful fallback works!
```

**Console Output**:
```
Error: VITE_GEMINI_API_KEY not found
    at src/services/GeminiAIService.ts
    
[Fallback response activated]
```

**Restore**:
```
1. Revert .env.local key
2. Save
3. Dev server reloads
4. Send message - real responses return
```

---

## 💾 Step 8: Test Conversation History

### Test 7: Multi-turn Conversation
```
1. Send: "What's my name?"
2. Wait for response
3. Send: "Do you remember?"
4. Check response
```

**Expected**:
- Response in message 2 references "Shreya"
- AI "remembered" from message 1
- Not first-time interaction

**Console Check**:
```javascript
geminiService.getHistory()

// Should show both messages:
[
  { role: 'user', content: 'What\'s my name?' },
  { role: 'model', content: 'Shreya ❤️, ...' },
  { role: 'user', content: 'Do you remember?' },
  { role: 'model', content: '... yes, you\'re Shreya ...' }
]

// History grows with each message
// Max 10 messages kept for performance
```

---

## ⏱️ Step 9: Test Response Speed

### Test 8: Measure Response Time
```
1. Open DevTools (F12)
2. Go to Network tab
3. Send message to Tushar AI
4. Look for "generativelanguage.googleapis.com" request
```

**Expected Timing**:
```
First response: 1-3 seconds (API call)
Subsequent: 1-2 seconds (API call)
Display: Instant (animated smoothly)

Total visible time: 1.5-3 seconds
(This is normal for API calls)
```

**Expected Network Request**:
```
URL: https://generativelanguage.googleapis.com/...
Method: POST
Status: 200 OK (success)
Size: ~2-5 KB
Time: 1-2 seconds
```

---

## 🎬 Step 10: Test Mobile Responsiveness

### Test 9: Check Mobile View
```
1. DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select "iPhone 12"
4. Send message
```

**Expected on Mobile**:
- [ ] Chat bubbles stack nicely
- [ ] Input box stays at bottom
- [ ] No horizontal scrolling
- [ ] Tap response area works
- [ ] Energy panel adapted to small screen
- [ ] All animations still smooth
- [ ] API still works (same requests)

**Test Sizes**:
- [ ] Mobile (375px)
- [ ] Tablet (768px)
- [ ] Desktop (1024px+)
- [ ] Ultra-wide (2560px)

---

## 🔍 Step 11: Browser Console Verification

### Test 10: Check Console Logs
```
1. Open DevTools (F12)
2. Go to Console tab
3. Send a message
4. Look for logs
```

**Expected Console Output**:
```
✅ [TusharAIChat] Detected mood: romantic
✅ [GeminiAI] Sending message to API
✅ [GeminiAI] Received response (256 tokens)
✅ [GeminiAI] Response: "Shreya ❤️, ..."
✅ [GeminiAI] Conversation history updated (4 messages)
```

**Should NOT See**:
```
❌ TypeError: Cannot read properties of null
❌ VITE_GEMINI_API_KEY is undefined
❌ Unexpected token in JSON
❌ 401 Unauthorized
```

---

## 🧩 Step 12: Test All Mood Types

### Test 11: Systematic Mood Testing

**Message Set**:
```
Test    Message                 Expected Mood
----    -------                 ------
1       "I love you"            romantic
2       "I'm so happy!"         happy
3       "I'm feeling sad"       sad
4       "This is frustrating"   angry
5       "I'm exhausted"         tired
6       "The weather today"     neutral
```

**Verification**:
```javascript
// In Console, after each message:
GeminiAIService.detectMood("I love you")
// Should output: "romantic"

GeminiAIService.detectMood("I'm happy")
// Should output: "happy"
```

**Response Quality**:
- [ ] Romantic: Poetic, emotional, uses hearts
- [ ] Happy: Celebratory, enthusiastic
- [ ] Sad: Supportive, empathetic
- [ ] Angry: Validating, calming
- [ ] Tired: Gentle, caring
- [ ] Neutral: Warm, present

---

## 🎨 Step 13: Visual Effects Test

### Test 12: Animations and Glows
```
1. Navigate to dashboard
2. Observe animations
3. Send multiple messages
```

**Check These**:
- [ ] Chat bubbles fade in smoothly
- [ ] Pink glow on AI responses
- [ ] Lavender glow on your messages
- [ ] No flickering or jumping
- [ ] Love Energy Panel animates smoothly
- [ ] Stats update with physics animation
- [ ] Background particles move gently
- [ ] No lag or performance issues

**Performance**:
```javascript
// In Console:
window.performance.now() // Record time
// Send message
window.performance.now() // Record again

// Should not exceed 16ms per frame (60fps)
```

---

## ✨ Step 14: End-to-End Success Test

### Complete Flow Test
```
1. Start app: npm run dev ✅
2. Login to dashboard ✅
3. See cinematic intro ✅
4. Send "Hi there" ✅
5. Get AI response with glow ✅
6. Send "I love you" ✅
7. Get romantic response ✅
8. Check mood detected correctly ✅
9. Verify energy panel updates ✅
10. Check console for no errors ✅
```

**Final Status**:
```
✅ API Integration: WORKING
✅ Mood Detection: WORKING
✅ Conversation Memory: WORKING
✅ Error Handling: WORKING
✅ Visual Effects: WORKING
✅ Mobile Responsive: WORKING
✅ Performance: ACCEPTABLE
```

---

## 🐛 Common Issues & Solutions

### Issue: "API key not found"
```
Solution:
1. Check .env.local exists in project root
2. Verify content: VITE_GEMINI_API_KEY=AIzaSyBkti1d_...
3. Restart dev server
4. Clear browser cache (Ctrl+Shift+Del)
```

### Issue: "CORS error in console"
```
Solution:
1. Verify API key is correct
2. Check internet connection
3. Try different browser
4. API might be rate limited - wait 1 minute
```

### Issue: "Response always the same"
```
Solution:
1. Check for yellow warning banner
2. Might be using fallback response
3. API key might be invalid
4. Verify GeminiAIService.ts is imported
```

### Issue: "Animations laggy on mobile"
```
Solution:
1. Reduce animation complexity
2. Edit src/App.css animation timings
3. Disable some visual effects
4. Check device performance (DevTools)
```

### Issue: "Chat history not persisting"
```
Solution:
1. This is normal - history is in-memory
2. Refreshing page clears history
3. To persist: add localStorage code
4. See GEMINI_API_SETUP.md for options
```

---

## 📊 Expected Test Results

### All Tests Passing ✅
```
Feature                Status
───────────────────────────────
API Connection         ✅ PASS
Mood Detection         ✅ PASS
Conversation Memory    ✅ PASS
Error Handling         ✅ PASS
Mobile Responsive      ✅ PASS
Performance (60fps)    ✅ PASS
Visual Effects         ✅ PASS
Cross-browser          ✅ PASS

Overall: PRODUCTION READY 🚀
```

---

## 🎉 Success Indicators

You'll know everything is working when:

1. **Messages appear instantly** (with smooth animation)
2. **AI responds with unique, contextual replies** (not repetitive)
3. **Responses include "Shreya ❤️"** (every time)
4. **Sad messages get supportive responses** (completely different from happy)
5. **Love Energy Panel updates** (reacts to mood)
6. **No errors in console** (clean DevTools)
7. **Mobile view works perfectly** (all sizes)
8. **Response time is 1-3 seconds** (normal for API)
9. **Yellow warning NEVER appears** (unless testing errors)
10. **Each message is completely unique** (true AI responses)

---

## 📝 Logging Issues

If something breaks, gather this info:

```
1. Browser: Chrome/Safari/Firefox?
2. Error message: (screenshot)
3. Console logs: (F12 → Console → screenshot)
4. Network tab: (F12 → Network → see API call)
5. Steps to reproduce: (exact sequence)
6. .env.local: (verify key format)
7. Node version: node --version
8. Bun/npm: npm --version
```

---

## 🚀 Ready to Test?

```bash
npm run dev
# Open http://localhost:5173/dashboard
# Start testing!
```

**Questions?** Check:
- [GEMINI_API_SETUP.md](./GEMINI_API_SETUP.md) - Technical details
- [GEMINI_QUICKSTART.md](./GEMINI_QUICKSTART.md) - Quick reference
- [FEATURES.md](./FEATURES.md) - Feature list

---

**Happy Testing!** 🎉✨

*Let Tushar AI show you what real AI companionship feels like!* 💕
