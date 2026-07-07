import { useState } from "react";

function AiAssistantPanel({ onSubmit, isLoading, response, error }) {
    const [prompt, setPrompt] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!prompt.trim()) return;
        onSubmit({ prompt: prompt.trim() });
    };

    return (
        <div className="bg-base-100 rounded-xl shadow-sm border border-base-300 p-4 h-full flex flex-col">
            <div className="mb-4">
                <h2 className="text-xl font-bold">AI Assistant</h2>
                <p className="text-sm text-base-content/60">Ask coding questions and get chatbot-style replies.</p>
            </div>

            <form className="flex-1 flex flex-col" onSubmit={handleSubmit}>
                <textarea
                    className="textarea textarea-bordered resize-none flex-1 min-h-[120px] w-full mb-3"
                    placeholder="Ask a coding question or request help..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <button
                    type="submit"
                    className="btn btn-primary mb-4"
                    disabled={isLoading}
                >
                    {isLoading ? "Generating..." : "Send"}
                </button>
            </form>

            <div className="overflow-auto h-[240px] bg-base-200 rounded-xl p-3">
                {error ? (
                    <p className="text-sm text-error">{error}</p>
                ) : response ? (
                    <pre className="text-sm font-mono whitespace-pre-wrap">{response}</pre>
                ) : (
                    <p className="text-sm text-base-content/60">AI response will appear here.</p>
                )}
            </div>
        </div>
    );
}

export default AiAssistantPanel;
