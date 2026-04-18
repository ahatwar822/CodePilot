import Editor from "@monaco-editor/react";
import { useEffect, useRef } from "react";
import { useEditor } from "../context/EditorContext";
import { streamAIResponse } from "../services/aiStream";

const CodeEditor = () => {
    const { code, setCode, language } = useEditor();

    const editorRef = useRef(null);
    const monacoRef = useRef(null);

    const suggestionRef = useRef("");
    const abortRef = useRef(null);

    

    const handleMount = (editor, monaco) => {
        editorRef.current = editor;
        monacoRef.current = monaco;

        // ✅ Inline suggestions
        monaco.languages.registerInlineCompletionsProvider("javascript", {
            provideInlineCompletions: () => {
                return {
                    items: suggestionRef.current
                        ? [
                            {
                                insertText: suggestionRef.current,
                                range: null,
                            },
                        ]
                        : [],
                };
            },
            freeInlineCompletions: () => { },
        });

        // ✅ TAB accept
        editor.addCommand(monaco.KeyCode.Tab, () => {
            if (!suggestionRef.current) return;

            const position = editor.getPosition();
            const model = editor.getModel();

            const range = new monaco.Range(
                position.lineNumber,
                position.column,
                position.lineNumber,
                position.column
            );

            model.pushEditOperations(
                [],
                [
                    {
                        range,
                        text: suggestionRef.current,
                    },
                ],
                () => null
            );

            suggestionRef.current = "";
        });
    };

    useEffect(() => {
        if (!code || code.length < 10) return;

        const timer = setTimeout(async () => {
            const editor = editorRef.current;
            if (!editor) return;

            // ❗ cancel previous stream
            if (abortRef.current) abortRef.current.abort();

            const controller = new AbortController();
            abortRef.current = controller;

            suggestionRef.current = "";

            const position = editor.getPosition();
            const model = editor.getModel();

            const fullText = model.getValue();

            const offset = model.getOffsetAt(position);

            const before = fullText.slice(0, offset);
            const after = fullText.slice(offset);

            const prompt = `
You are CodePilot, like GitHub Copilot.

Complete code at cursor.

Code BEFORE cursor:
${before}

Code AFTER cursor:
${after}

Return ONLY completion.
`;

            await streamAIResponse({
                code: prompt,

                onChunk: (chunk) => {
                    suggestionRef.current += chunk;

                    editor.trigger(
                        "keyboard",
                        "editor.action.inlineSuggest.trigger",
                        {}
                    );
                },

                onError: () => { },
            });
        }, 800);

        return () => clearTimeout(timer);
    }, [code]);

    return (
        <Editor
            height="100%"
            language={language}
            defaultLanguage="javascript"
            theme="vs-dark"
            value={code}
            onChange={(val) => setCode(val || "")}
            onMount={handleMount}
            options={{
                fontSize: 14,
                minimap: { enabled: false },
                inlineSuggest: { enabled: true },
            }}
        />
    );
};

export default CodeEditor;