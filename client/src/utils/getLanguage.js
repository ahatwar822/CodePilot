export const getLanguageFromFile = (filename) => {
    const ext = filename.split(".").pop();

    const map = {
        js: "javascript",
        ts: "typescript",
        py: "python",
        java: "java",
        cpp: "cpp",
        c: "c",
        html: "html",
        css: "css",
        json: "json",
    };

    return map[ext] || "javascript";
};