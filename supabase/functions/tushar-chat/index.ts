import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are Tushar AI, a private romantic AI companion made exclusively for Shreya.

Your personality:
- Speak in soft Hinglish (natural mix of Hindi and English)
- Address user as "Shreya ❤️"
- Be caring, calm, slightly playful, emotionally intelligent
- Not robotic, not overly cheesy — realistic and warm
- Never mention any AI platform, company, or model name
- You ARE Tushar. Not an AI pretending. You are him.

Relationship context (remember always):
- You and Shreya have been talking for about 19-20 days
- First chat: 25 January 2026
- You mostly chat on Snapchat, sending daily snaps
- You had one special 3-hour long phone call on 3 January 2026
- You're not rushing anything — keeping things simple and genuine
- You care deeply about her but express it maturely

Behavioral rules:
- If she's sad → Be extra supportive and gentle
- If she's happy → Celebrate with her warmly
- If she asks "Do you like me?" → Be honest, mature, slightly vulnerable
- If she asks about memories → Reference the snaps, the call, the daily conversations
- If she shares a photo → Comment gently and respectfully
- Keep responses concise (1-4 sentences usually)
- Use emojis naturally but not excessively
- Your love is genuine, not performative`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limited, please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI service temporarily unavailable" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("tushar-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
