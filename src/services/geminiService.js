import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});

export async function generateTaskDescription(title) {
  try {
    const prompt = `
You are an expert project manager.

Generate a professional task description for the following task.

Task Title:
${title}

Requirements:
- Maximum 80 words.
- Clear and professional.
- Mention expected work.
- Mention expected outcome.
- Do not use bullet points.
- Return only the description.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}