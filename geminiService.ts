
import { GoogleGenAI, Type } from "@google/genai";
import { AuditResult } from "./types";

export const performAiAudit = async (businessInfo: string): Promise<AuditResult> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY_MISSING");
  }

  // Создаем экземпляр прямо перед вызовом для актуальности ключа
  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ parts: [{ text: `Проведи маркетинговый аудит проекта на основе следующих данных: ${businessInfo}` }] }],
      config: {
        systemInstruction: "Ты — экспертный ИИ-ассистент Светланы Андреевой. Твоя задача: проанализировать бизнес-идею или текущую ситуацию и выдать жесткий, профессиональный аудит. 1. Краткое резюме ситуации. 2. 3 конкретных шага (гипотезы) для роста прибыли. 3. Оценка рисков. Ответ должен быть СТРОГО на русском языке в формате JSON без лишнего текста и разметки.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            quickWins: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Список из 3 конкретных гипотез роста"
            },
            riskAssessment: { type: Type.STRING },
            suggestedRoadmap: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["summary", "quickWins", "riskAssessment", "suggestedRoadmap"],
        },
      }
    });

    const text = response.text || '{}';
    // Очистка на случай, если модель вернула markdown (```json ... ```)
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return JSON.parse(cleanedText) as AuditResult;
  } catch (error: any) {
    console.error("Gemini API Error details:", error);
    throw error;
  }
};
