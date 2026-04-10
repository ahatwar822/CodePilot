import { generateAIResponse } from "../../utils/ai.utils.js";
import { serverError, success } from "../../utils/response.utils.js"

export const aiChatController = async (req, res) => {
    try {
        const userMassage = req.params.chat;

        //callutility function to generate AI response
        const response = await generateAIResponse(userMassage);

        return success(res, { response });
        
    } catch (error) {
        return serverError(res, "Internal Server Error while processing AI chat", { error: error.message });
    }
}