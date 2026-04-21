import api from "./api";

// Chat with AI (normal message + optional code)
 
export const chatAI = async ({ message, code }) => {
    const res = await api.post("/ai/chat", {
        message,
        code,
    });

    return res.data.data;
};

// Get code suggestion (non-stream) 
export const suggestAI = async ({ code, language }) => {
    const res = await api.post("/ai/suggest", {
        code,
        language,
    });

    return res.data.data;
};