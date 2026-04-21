let controller = null;

export const streamAIResponse = async ({
    code,
    language,
    onChunk,
    onStart,
    onEnd,
    onError,
}) => {
    try {
        if (!code) throw new Error("Code is required");

        // cancel previous stream
        if (controller) controller.abort();
        controller = new AbortController();

        onStart && onStart();

        const res = await fetch(`${import.meta.env.VITE_API_URL}/ai/stream`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ code, language }),
            signal: controller.signal,
        });

        if (!res.ok) {
            throw new Error(`Request failed: ${res.status}`);
        }

        if (!res.body) throw new Error("Streaming not supported");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        let done = false;

        while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;

            const chunk = decoder.decode(value, { stream: true });

            onChunk && onChunk(chunk);
        }

        onEnd && onEnd();

    } catch (err) {
        if (err.name === "AbortError") return; // ignore cancel

        console.error("AI Stream Error:", err.message);
        onError && onError(err);
    }
};