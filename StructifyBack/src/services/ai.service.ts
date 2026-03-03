import Groq from "groq-sdk";
import { GeneratedResult } from "../types/generated.types";
import { generatePrompt } from "../prompts/generate.prompt";
import { logger } from "../utils/logger";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function generateArchitecture(description: string): Promise<GeneratedResult> {
    logger.info("Sending request to Groq AI", { descriptionLength: description.length });

    const prompt = generatePrompt(description);

    const chatCompletion = await groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "You are Structify, a software architecture AI. You respond only with valid JSON.",
            },
            {
                role: "user",
                content: prompt,
            },
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.6,
        max_tokens: 4096,
        response_format: { type: "json_object" },
    });

    const rawContent = chatCompletion.choices[0]?.message?.content;

    if (!rawContent) {
        throw new Error("No response received from Groq AI");
    }

    logger.debug("Raw Groq response", { content: rawContent.substring(0, 200) });

    const parsed: GeneratedResult = JSON.parse(rawContent) as GeneratedResult;

    logger.info("Architecture generated successfully", {
        entityCount: parsed.entities.length,
        relationshipCount: parsed.relationships.length,
    });

    return parsed;
}
