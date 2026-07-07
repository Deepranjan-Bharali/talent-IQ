import { ENV } from "../lib/env.js";

const OPENAI_API_URL = ENV.GEMINI_API_URL || "https://api.openai.com/v1/responses";
const GEMINI_MODEL = ENV.GEMINI_MODEL || "gpt-4.1-mini";

const extractText = (value) => {
    if (value == null) return "";
    if (typeof value === "string") return value;
    if (Array.isArray(value)) return value.map(extractText).join("");
    if (typeof value === "object") {
        if (value.text) return value.text;
        if (value.content) return extractText(value.content);
        if (value.output) return extractText(value.output);
        if (value.parts) return value.parts.map(extractText).join("");
        if (value.items) return value.items.map(extractText).join("");
        return Object.values(value).map(extractText).join("");
    }
    return String(value);
};

const buildPrompt = (mode, prompt, context = {}) => {
    const base = [
        "You are an expert coding assistant that helps developers with programming hints, debugging support, and interview question generation.",
    ];

    if (mode === "hint") {
        const problemDescription = context.problemDescription || "No problem description provided.";
        const language = context.language || "unspecified language";
        const code = context.code || "";

        base.push(
            `Provide a concise, actionable hint for this problem and the current code state.`,
            `Problem: ${problemDescription}`,
            `Language: ${language}`,
            `Code:\n${code}`,
            `Question: ${prompt || "Please provide a helpful hint."}`
        );
        return base.join("\n\n");
    }

    if (mode === "interview") {
        const difficulty = context.difficulty || "intermediate";
        const topic = context.topic || "general coding";

        base.push(
            `Generate three strong coding interview questions with short answers for a ${difficulty} candidate on ${topic}.`,
            `If the user adds additional guidance, use it to refine the questions: ${prompt || "No extra guidance provided."}`
        );
        return base.join("\n\n");
    }

    const problemDescription = context.problemDescription ? `Problem: ${context.problemDescription}` : "";
    const code = context.code ? `Current code:\n${context.code}` : "";

    base.push(
        "Answer as a coding assistant.",
        problemDescription,
        code,
        `User question: ${prompt}`
    );
    return base.join("\n\n");
};

export async function askAiChat(req, res) {
    try {
        const { prompt, mode = "chat", context = {} } = req.body;
        if (!prompt || !prompt.toString().trim()) {
            return res.status(400).json({ message: "Prompt is required." });
        }

        if (!ENV.GEMINI_API_KEY) {
            return res.status(500).json({ message: "Gemini API key is not configured." });
        }

        const requestBody = {
            model: GEMINI_MODEL,
            input: buildPrompt(mode, prompt, context),
            temperature: 0.25,
            max_output_tokens: 600,
        };

        const response = await fetch(OPENAI_API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${ENV.GEMINI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Gemini request failed", response.status, errorText);
            return res.status(502).json({ message: "AI service error.", details: errorText });
        }

        const responseData = await response.json();
        const aiResponse = extractText(responseData.output) || extractText(responseData);

        return res.status(200).json({ aiResponse });
    } catch (error) {
        console.error("askAiChat error", error);
        return res.status(500).json({ message: "Unable to process AI request." });
    }
}
