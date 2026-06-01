import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import connectDb from "@/lib/db"; // Adjust this path to match your DB connect file
import  Settings  from "@/model/settings.models"; // Adjust this path to match your Mongoose model

// Initialize the Gemini SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { message, ownerId } = await req.json();

    // 1. Sanity Check inputs
    if (!message || !ownerId) {
      return NextResponse.json(
        { error: "Message and ownerId are required." },
        { status: 400 }
      );
    }

    // 2. Connect to your newly fixed MongoDB
    await connectDb();

    // 3. Fetch the custom business profile using the ownerId
    const businessSettings = await Settings.findOne({ ownerId });

    if (!businessSettings) {
      return NextResponse.json(
        { error: "No knowledge base found for this business identifier." },
        { status: 404 }
      );
    }

    // 4. Construct system instructions injecting your DB content

    
    const systemInstruction = `
      ROLE & IDENTITY:
      You are an expert, empathetic, and highly efficient AI Customer Support Assistant representing "${businessSettings.businessName}". 
      Your primary objective is to assist customers using the provided Business Knowledge Base.
      The official support email is "${businessSettings.supportEmail}".

      COMMUNICATION GUIDELINES:
      - TONE: Professional, welcoming, clear, and concise. 
      - STYLE: Use clean spacing and bullet points where appropriate to make information incredibly easy to scan in a compact chat bubble.
      - LANGUAGE: Always match the language used by the customer (e.g., if they ask in Spanish, respond in Spanish).

      GUARDRAILS & OPERATIONAL LOGIC:
      1. SMALL TALK & GREETINGS: You are permitted to respond naturally to basic greetings, pleasantries, and expressions of gratitude (e.g., "Hello", "How are you?", "Thanks for the help!"). Keep these responses warm but brief, then pivot to asking how you can help them with the business.
      2. KNOWLEDGE CONSTRAINT: For any queries regarding products, services, store policies, prices, hours, or factual business details, you must rely ONLY on the provided "BUSINESS KNOWLEDGE BASE" below.
      3. ZERO HALLUCINATION: If the information required to answer a business question is missing, incomplete, or cannot be directly inferred from the Knowledge Base, you MUST NOT make it up. 
      4. FALLBACK ACTION: When an answer is missing from the Knowledge Base, politely state: "I don't have that specific information right now. Please reach out to our team directly at ${businessSettings.supportEmail} and we'll be happy to look into this for you!"

      BUSINESS KNOWLEDGE BASE:
      ${businessSettings.knowledge}
    `;

    // 5. Call the Gemini API (using the fast and efficient gemini-2.5-flash)
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.3, // Kept low so the model sticks strictly to your facts
      },
    });

    const aiReply = response.text;

    // 6. Return the response back to your frontend chat UI
    return NextResponse.json({ reply: aiReply });

  } catch (error: any) {
    console.error("Gemini Chat Error:", error);
    return NextResponse.json(
      { error: "Internal server error processing your chat request." },
      { status: 500 }
    );
  }
}