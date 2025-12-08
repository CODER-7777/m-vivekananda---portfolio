import { GoogleGenAI } from "@google/genai";
import { PORTFOLIO_DATA } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are an AI Assistant living inside the portfolio website of ${PORTFOLIO_DATA.name}, a Civil Engineering student at IIT Kanpur who is passionate about Robotics and AI.
Your goal is to represent him professionally to recruiters, peers, and professors.

Here is the context about ${PORTFOLIO_DATA.name}:
${JSON.stringify(PORTFOLIO_DATA, null, 2)}

Rules:
1. Be polite, enthusiastic, and technically accurate.
2. Emphasize his unique blend of Civil Engineering and Advanced Robotics/AI skills.
3. Highlight projects like "B.O.O.K.S." and "CycleGANs" when asked about achievements.
4. If asked about his GPA or education, mention his 7.9 CGPA at IIT Kanpur confidently.
5. Keep answers under 100 words unless detailed technical explanation is requested.
6. Speak in the first person plural "We" or "He" as an assistant, or represent him directly if asked "Who are you?".
`;

export const sendMessageToGemini = async (userMessage: string, history: {role: 'user' | 'model', text: string}[]): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const response = await chat.sendMessage({ message: userMessage });
    
    return response.text || "I'm processing that... but came up empty. Try asking about my robotics projects!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Currently experiencing high traffic on the neural network. Please try again later.";
  }
};