import { GoogleGenAI } from '@google/genai';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function listModels() {
  try {
    const response = await ai.models.list({});
    for await (const model of response) {
      console.log(model.name, model.supportedGenerationMethods);
    }
  } catch (err) {
    console.error("Error listing models:", err);
  }
}
listModels();
