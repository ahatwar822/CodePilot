import api from "./api";

export const saveFileAPI = async (fileId, content) => {
    return await api.put(`/file/${fileId}`, { content });
};