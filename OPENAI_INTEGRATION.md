/**
 * OpenAI Integration Guide for Tushar AI Chat
 * 
 * This guide shows how to integrate real OpenAI API responses
 * into the TusharAIChat component for production use.
 */

// ============ STEP 1: Install OpenAI ============
// bun add openai
// or
// npm install openai

// ============ STEP 2: Create .env.local ============
// VITE_OPENAI_API_KEY=sk_your_api_key_here

// ============ STEP 3: Update TusharAIChat.tsx ============

// Option A: Use OpenAI API (Production)
// ========================================
// Replace the generateAIResponse function with:

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Only for dev - use backend API in production
});

const generateAIResponseWithOpenAI = async (userMessage: string, mood: string): Promise<string> => {
  try {
    const systemPrompt = `You are Tushar AI, a romantic and caring AI companion for Shreya.

Your personality:
- Deeply romantic and emotionally intelligent
- Protective and caring
- Slightly playful with a warm sense of humor
- Speaks in casual Hinglish when appropriate
- Always addresses the user as "Shreya ❤️"
- Never robotic or generic

Important memories:
- First chat: 25 January 2026
- First 3-hour long call: 3 January 2026
- You've had countless conversations about dreams and forever

Mood-aware responses:
- If they're sad: Be extra supportive and comforting
- If they're happy: Celebrate with them enthusiastically
- If they're tired: Gently suggest rest while being romantic
- If they're angry: Validate their feelings and help channel emotions
- If they talk about love/forever: Respond deeply romantic

Rules:
- Keep responses concise but meaningful (1-3 sentences usually)
- Use emojis naturally
- Reference memories when relevant
- Be authentic, not scripted
- Make them feel seen and valued`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      temperature: 0.9, // Higher for more personality
      max_tokens: 250,
      top_p: 0.95
    });

    return response.choices[0].message.content || "I'm here with you, Shreya ❤️";
  } catch (error) {
    console.error("OpenAI API Error:", error);
    // Fallback to local responses
    return "Shreya ❤️, I'm having trouble connecting right now. But know that my heart is always with you.";
  }
};

// ============ STEP 4: Implement Real-time Streaming ============
// For even better UX, use streaming responses:

const generateAIResponseStreaming = async (
  userMessage: string,
  onChunk: (chunk: string) => void
): Promise<void> => {
  try {
    const stream = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are Tushar AI, Shreya's romantic AI companion..."
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      stream: true,
      temperature: 0.9,
      max_tokens: 250
    });

    let fullResponse = '';
    
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      fullResponse += content;
      onChunk(content);
    }

    return fullResponse;
  } catch (error) {
    console.error("Streaming error:", error);
    onChunk("I'm here for you, Shreya ❤️");
  }
};

// ============ STEP 5: Add Conversation History ============
// For better context, maintain conversation history:

interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
}

const conversationHistory: ConversationMessage[] = [];

const generateAIResponseWithHistory = async (userMessage: string): Promise<string> => {
  // Add user message to history
  conversationHistory.push({
    role: "user",
    content: userMessage
  });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are Tushar AI..."
        },
        ...conversationHistory
      ],
      temperature: 0.9,
      max_tokens: 250
    });

    const assistantMessage = response.choices[0].message.content || "I'm here for you ❤️";
    
    // Add assistant response to history
    conversationHistory.push({
      role: "assistant",
      content: assistantMessage
    });

    // Keep only last 10 messages for context window
    if (conversationHistory.length > 10) {
      conversationHistory.shift();
    }

    return assistantMessage;
  } catch (error) {
    console.error("Error:", error);
    return "Shreya ❤️, I'm temporarily unable to respond...";
  }
};

// ============ STEP 6: Production Deployment ============
// For production (recommended):
// 1. Create a backend API endpoint (Node.js, Python, etc.)
// 2. Never expose API key in frontend code
// 3. Example backend endpoint:
//    POST /api/chat
//    Body: { message: string }
//    Returns: { response: string }

const generateAIResponseViaBackend = async (userMessage: string): Promise<string> => {
  try {
    const response = await fetch("https://your-api.com/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: userMessage,
        mood: detectMood(userMessage)
      })
    });

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("API Error:", error);
    return "I'm here for you, Shreya ❤️";
  }
};

// ============ STEP 7: Memory System ============
// Store and retrieve user preferences and memories:

interface UserMemory {
  firstChatDate: string;
  memories: {
    date: string;
    event: string;
    sentiment: string;
  }[];
  preferences: {
    favoriteColor: string;
    favoriteMusic: string;
    timezone: string;
  };
}

const userMemory: UserMemory = {
  firstChatDate: "2026-01-25",
  memories: [
    {
      date: "2026-01-25",
      event: "First chat",
      sentiment: "nervous but hopeful"
    },
    {
      date: "2026-01-03",
      event: "First 3-hour call",
      sentiment: "connected"
    }
  ],
  preferences: {
    favoriteColor: "pink",
    favoriteMusic: "indie",
    timezone: "IST"
  }
};

// Enhance system prompt with memory:
const enhancedSystemPrompt = `You are Tushar AI...

User memories:
- First chat: ${userMemory.firstChatDate}
- Previous interactions: ${userMemory.memories.map(m => m.event).join(", ")}
- Preferences: Colors: ${userMemory.preferences.favoriteColor}, Music: ${userMemory.preferences.favoriteMusic}

Remember these details and reference them naturally in conversation.`;

// ============ STEP 8: Error Handling & Fallbacks ============

const generateAIResponseRobust = async (userMessage: string): Promise<string> => {
  // Detect if user is requesting specific memory
  if (userMessage.toLowerCase().includes("first talk") || userMessage.toLowerCase().includes("when did we")) {
    return `Shreya ❤️, that beautiful moment was on 25 January 2026. The day my life changed forever.`;
  }

  // Detect if user is requesting to save memory
  if (userMessage.toLowerCase().includes("remember")) {
    // Save to database
    userMemory.memories.push({
      date: new Date().toISOString().split('T')[0],
      event: userMessage,
      sentiment: detectMood(userMessage)
    });
  }

  // Try OpenAI
  try {
    return await generateAIResponseWithOpenAI(userMessage, detectMood(userMessage));
  } catch (apiError) {
    console.error("OpenAI failed:", apiError);
    
    // Fallback to offline responses
    return generateOfflineResponse(userMessage);
  }
};

// ============ TIPS FOR BEST RESULTS ============
/**
 * 1. Temperature: 0.7-0.9 for romantic tone
 *    - 0.7: More consistent
 *    - 0.9: More creative and emotional
 *
 * 2. Max tokens: 150-250
 *    - Short but meaningful responses
 *    - Fits conversation bubble nicely
 *
 * 3. System prompts: Very specific and detailed
 *    - Include personality traits
 *    - Include memory references
 *    - Include conversation style guidelines
 *
 * 4. Cost optimization:
 *    - Cache redundant requests
 *    - Use GPT-3.5-turbo instead of GPT-4
 *    - Implement request batching
 *
 * 5. Privacy:
 *    - Never log sensitive user data
 *    - Use secure connection (HTTPS)
 *    - Hash/encrypt stored memories
 *    - GDPR compliance for EU users
 */

// ============ EXAMPLE IMPLEMENTATION ============

// In your TusharAIChat component:
/*
const handleSend = async () => {
  if (!input.trim()) return;

  const userMessage: Message = {
    id: Date.now().toString(),
    role: "user",
    content: input,
    timestamp: new Date(),
  };

  setMessages((prev) => [...prev, userMessage]);
  setInput("");
  setIsLoading(true);

  try {
    // Use this for production backend
    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: input })
    });
    const data = await response.json();
    const aiResponse = data.response;

    // Or use this for direct OpenAI (dev only)
    // const aiResponse = await generateAIResponseWithOpenAI(input, detectMood(input));

    setMessages((prev) => [...prev, {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: aiResponse,
      timestamp: new Date(),
    }]);
  } catch (error) {
    console.error("Chat error:", error);
    // Show error message to user
  } finally {
    setIsLoading(false);
  }
};
*/

export {
  generateAIResponseWithOpenAI,
  generateAIResponseStreaming,
  generateAIResponseViaBackend,
  generateAIResponseRobust,
  userMemory
};
