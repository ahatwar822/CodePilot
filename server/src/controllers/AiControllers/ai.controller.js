import { generateAIResponse } from "../../services/ai.service.js";
import { badRequest, serverError, success } from "../../utils/response.utils.js"

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