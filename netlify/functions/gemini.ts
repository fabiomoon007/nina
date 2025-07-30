import { GoogleGenAI, HarmCategory, HarmBlockThreshold } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
];

export default async (req: Request) => {
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
    }

    try {
        const { prompt, tools } = await req.json();

        if (!prompt) {
            return new Response(JSON.stringify({ error: 'Prompt is required' }), { status: 400 });
        }

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                tools: tools || [],
                safetySettings: safetySettings,
            },
        });
        
        const text = response.text;
        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
        const sources = groundingChunks
            .filter(chunk => chunk.web?.uri)
            .map(chunk => ({
                web: {
                    uri: chunk.web!.uri!,
                    title: chunk.web!.title || chunk.web!.uri!,
                },
            }));

        return new Response(JSON.stringify({ text, sources }), {
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error("Error in Netlify function:", error);
        return new Response(JSON.stringify({ error: error.message || "An internal error occurred" }), { status: 500 });
    }
};
