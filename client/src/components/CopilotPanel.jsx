import React, { useEffect } from 'react'
import { useEditor } from '../context/EditorContext';
import api from '../services/api';

const CopilotPanel = () => {
    const { code, suggestion, setSuggestion, loading, setLoading } = useEditor();

    const getSuggestion = async () => {
        if (!code) return alert("Write some code first");

        try {
            setLoading(true);

            const res = await api.post("/ai/suggest", {
                code,
                language: "javascript",
            });

            setSuggestion(res.data.data.suggestion);
        } catch (err) {
            alert("AI failed");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (code.length > 20) getSuggestion();
        }, 1000);

        return () => clearTimeout(timer);
    }, [code]);
    return (
        <div className="h-full p-4 overflow-y-auto bg-[#252526]">
            <h2 className="text-lg font-bold mb-3">Copilot</h2>
            <div className="text-gray-400 text-sm">AI assistant ready to help</div>
            <button
                onClick={getSuggestion}
                className="bg-blue-600 p-2 mb-3 rounded"
            >
                {loading ? "Thinking..." : "Suggest Code"}
            </button>

            <pre className="text-sm whitespace-pre-wrap overflow-auto">
                {suggestion}
            </pre>
        </div>
    )
}

export default CopilotPanel