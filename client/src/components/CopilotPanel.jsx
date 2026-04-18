import { useEditor } from "../context/EditorContext";
import { streamAIResponse } from "../services/aiStream";

const CopilotPanel = () => {
    const { code, suggestion, setSuggestion, loading, setLoading } = useEditor();

    const handleStream = async () => {
        if (!code.trim()) {
            alert("Write some code first");
            return;
        }

        setSuggestion("");

        await streamAIResponse({
            code,

            onStart: () => setLoading(true),

            onChunk: (chunk) => {
                setSuggestion((prev) => prev + chunk);
            },

            onEnd: () => setLoading(false),

            onError: () => {
                setLoading(false);
                alert("Streaming failed");
            },
        });
    };

    return (
        <div className="p-3 h-full flex flex-col">
            <button
                onClick={handleStream}
                disabled={loading}
                className="bg-blue-600 p-2 mb-3 rounded disabled:opacity-50"
            >
                {loading ? "Thinking..." : "Stream Suggestion"}
            </button>

            <pre className="text-sm whitespace-pre-wrap flex-1 overflow-auto">
                {suggestion}
            </pre>
        </div>
    );
};

export default CopilotPanel;