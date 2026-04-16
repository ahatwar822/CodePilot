import { Groq } from "groq-sdk";
import dotenv from 'dotenv'
dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

/**
 * Generates AI response using Groq API
 * @param {string} message - User's input message
 * @returns {Promise<string>} - AI-generated response
 * @throws {Error} - Throws error if API call or validation fails
 */
export async function generateAIResponse(message) {
  try {
    // Validate input message
    if (!message || message.trim() === '') {
      throw new Error('Message cannot be empty');
    }

    // Verify API key is configured
    if (!process.env.GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY is not configured in environment variables');
    }

    // Call Groq API to generate response
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are CodePilot, an AI coding assistant like GitHub Copilot."
        },
        {
          role: "user",
          content: message
        }
      ],
      model: "llama-3.3-70b-versatile", // ✅ correct model
      temperature: 0.7,
      max_tokens: 700
    });

    // Extract and return the response content
    const response = chatCompletion.choices[0]?.message?.content;

    if (!response) {
      throw new Error('No response received from AI API');
    }

    return response;
  } catch (err) {
    // Log error details for debugging
    console.error('Error in generateAIResponse:', {
      message: err.message,
      status: err.status,
      type: err.constructor.name
    });

    // Re-throw error to be handled by controller
    throw err;
  }
}