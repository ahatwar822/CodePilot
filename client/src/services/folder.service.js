import api from "./api";

export const renameFolderAPI = (id, name) =>
    api.put(`/folder/${id}`, { newName: name });

export const deleteFolderAPI = (id) =>
    api.delete(`/folder/${id}`);