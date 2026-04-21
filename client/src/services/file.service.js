import api from "./api";

export const saveFileAPI = async (fileId, content) => {
    return await api.put(`/file/${fileId}`, { content });
};

export const renameFileAPI = (id, name) =>
    api.put(`/file/${id}`, { name });

export const deleteFileAPI = (id) =>
    api.delete(`/file/${id}`);