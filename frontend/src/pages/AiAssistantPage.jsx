import { useState } from "react";
import Navbar from "../components/Navbar";
import AiAssistantPanel from "../components/AiAssistantPanel";
import { aiApi } from "../api/ai";

function AiAssistantPage() {
    const [aiResponse, setAiResponse] = useState("");
    const [aiError, setAiError] = useState(null);
    const [aiLoading, setAiLoading] = useState(false);

    const handleAskAi = async ({ prompt, mode }) => {
        if (!prompt?.trim()) return;
        setAiLoading(true);
        setAiError(null);
        setAiResponse("");

        try {
            const response = await aiApi.askChat({
                prompt,
                mode,
                context: {
                    problemDescription: "Use this assistant for coding hints, interview question ideas, or debugging help.",
                    language: "javascript",
                    code: "",
                    difficulty: "intermediate",
                    topic: "general programming",
                },
            });
            setAiResponse(response.aiResponse || "No response from AI.");
        } catch (error) {
            setAiError(error?.response?.data?.message || error?.message || "AI request failed.");
        } finally {
            setAiLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-100 flex flex-col">
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold">AI Assistant</h1>
                    <p className="text-base-content/70 mt-2">
                        Ask coding questions, request hints, or generate interview questions.
                    </p>
                </div>

                <div className="bg-base-200 rounded-3xl p-4 shadow-sm">
                    <AiAssistantPanel
                        onSubmit={handleAskAi}
                        isLoading={aiLoading}
                        response={aiResponse}
                        error={aiError}
                    />
                </div>
            </div>
        </div>
    );
}

export default AiAssistantPage;
