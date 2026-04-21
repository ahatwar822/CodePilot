import { useState } from "react";
import { useEditor } from "../context/EditorContext";
import { streamAIResponse } from "../services/aiStream";
import { suggestAI, chatAI } from "../services/ai.service";

const CopilotPanel = () => {
  const {
    code,
    language,
    suggestion,
    setSuggestion,
    loading,
    setLoading,
  } = useEditor();

  const [input, setInput] = useState("");

  //  CHAT
  const handleChat = async () => {
    if (!input.trim()) return;

    try {
      setLoading(true);

      const res = await chatAI({
        message: input,
        code,
      });

      setSuggestion(res.response);
    } catch (err) {
      console.error(err);
      alert("Chat failed");
    } finally {
      setLoading(false);
    }
  };

  //  SUGGEST
  const handleSuggest = async () => {
    if (!code.trim()) {
      alert("Write some code first");
      return;
    }

    try {
      setLoading(true);
      setSuggestion("");

      const res = await suggestAI({
        code,
        language,
      });

      setSuggestion(res.suggestion); 
    } catch (err) {
      console.error(err);
      alert("Suggestion failed");
    } finally {
      setLoading(false);
    }
  };

  // STREAM (REAL COPILOT)
  const handleStream = async () => {
    if (!code.trim()) {
      alert("Write some code first");
      return;
    }

    setSuggestion("");

    await streamAIResponse({
      code,
      language,

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
    <div className="h-full flex flex-col bg-[#1e1e1e]">

      {/*  HEADER */}
      <div className="p-2 border-b border-gray-700 text-sm text-gray-300">
        Copilot
      </div>

      {/*  OUTPUT AREA (VS CODE STYLE) */}
      <div className="flex-1 p-3 text-sm whitespace-pre-wrap leading-relaxed overflow-auto custom-scroll bg-gray-800">
        {loading ? (
          <span className="text-gray-400 animate-pulse">Thinking...</span>
        ) : (
          suggestion || <span className="text-gray-500">Ask or generate code...</span>
        )}
      </div>

      {/*  INPUT */}
      <div className="p-2 border-t border-gray-700">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Copilot..."
          className="w-full bg-[#252526] p-2 text-sm rounded outline-none resize-none custom-scroll"
          rows={3}
        />

        {/*  ACTIONS */}
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleChat}
            className="bg-blue-600 px-2 py-1 rounded text-xs"
          >
            Chat
          </button>

          <button
            onClick={handleSuggest}
            className="bg-green-600 px-2 py-1 rounded text-xs"
          >
            Suggest
          </button>

          <button
            onClick={handleStream}
            className="bg-purple-600 px-2 py-1 rounded text-xs"
          >
            Stream
          </button>
        </div>
      </div>
    </div>
  );
};

export default CopilotPanel;