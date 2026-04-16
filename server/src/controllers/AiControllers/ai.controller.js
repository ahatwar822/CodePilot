import { Groq } from "groq-sdk";
import { generateAIResponse } from "../../services/ai.service.js";
import { badRequest, serverError, success } from "../../utils/response.utils.js"

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});
export const aiChatController = async (req, res) => {
    try {
        const { message, code } = req.body;

        if (!message) return badRequest(res, "Message required");

        const prompt = code
            ? `Code:\n${code}\n\nInstruction:\n${message}`
            : message;

        //callutility function to generate AI response
        const response = await generateAIResponse(prompt);

        return success(res, { response });

    } catch (error) {
        return serverError(res, "Internal Server Error while processing AI chat", { error: error.message });
    }
}

export const suggestCodeController = async (req, res, next) => {
    try {
        const { code, language } = req.body;

        if (!code) return badRequest(res, "Code is required");

        const prompt = `
You are CodePilot, an AI coding assistant like GitHub Copilot.

Language: ${language || "javascript"}

Complete or improve the following code:

${code}

Return only code. No explanation unless necessary.
`;

        const suggestion = await generateAIResponse(prompt);

        return success(res, { suggestion });

    } catch (err) {
        next(err);
    }
};

export const streamSuggestionController = async (req, res, next) => {
    try {
        const { code, language } = req.body;

        if (!code) {
            return res.status(400).json({ message: "Code is required" });
        }

        // ✅ Smart Prompt (IMPORTANT UPGRADE)
        const prompt = `
You are CodePilot, an AI coding assistant like GitHub Copilot.

Language: ${language || "javascript"}

Continue or complete the following code:

${code}

Return ONLY code. No explanation.
`;

        // ✅ Streaming headers
        res.setHeader("Content-Type", "text/plain");
        res.setHeader("Transfer-Encoding", "chunked");

        // ✅ Streaming AI response
        const stream = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are CodePilot, an AI coding assistant like GitHub Copilot. Return clean, optimized code."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            model: "llama-3.3-70b-versatile",
            stream: true
        });

        // ✅ Send chunks one by one
        for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || "";
            res.write(content);
        }

        res.end();

    } catch (error) {
        next(error);
    }
};