import { GoogleGenAI } from '@google/genai';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function run() {
  // Try calling the model directly to see if gemini-1.5-flash works
  try {
    const res = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: 'hi'
    });
    console.log('gemini-2.0-flash works');
  } catch (e) { console.error('gemini-2.0-flash failed', e.message); }

  try {
    const res = await ai.models.generateContent({
      model: 'gemini-1.5-pro-latest',
      contents: 'hi'
    });
    console.log('gemini-1.5-pro-latest works');
  } catch (e) { console.error('gemini-1.5-pro-latest failed', e.message); }
  
  try {
    const res = await ai.models.generateContent({
      model: 'gemini-1.5-pro',
      contents: 'hi'
    });
    console.log('gemini-1.5-pro works');
  } catch (e) { console.error('gemini-1.5-pro failed', e.message); }
}
run();
