/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

import { GoogleGenerativeAI } from "@google/generative-ai";



const MODEL_NAME ="gemini-1.5-flash";
const API_KEY = process.env.API_KEY;
 



 async function runChat(prompt) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({model:MODEL_NAME});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

  const chatSession = model.startChat({
    generationConfig,
 // safetySettings: Adjust safety settings
 // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
    ],
  });

  const result = await chatSession.sendMessage(prompt);
  const response = result.response;
  console.log(response.text());
  return response.text();
}

export default runChat;