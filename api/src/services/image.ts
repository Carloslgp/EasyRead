import Anthropic from "@anthropic-ai/sdk"
import { EXTRACT_IMAGE_SYSTEM_PROMPT } from "../lib/prompt.js"

const client = new Anthropic();

const MAX_CHARS = 50_000;

type SupportedMediaType = "image/jpeg" | "image/png" | "image/webp";

export type ImageExtractionResult = {
    text: string;
    truncated: boolean;
    method: "vision";
};

function isSupportedMediaType(mimeType: string): mimeType is SupportedMediaType {
    return ["image/jpeg", "image/png", "image/webp"].includes(mimeType);
}

export async function extractTextFromImage(buffer: Buffer, mimeType: string): Promise<ImageExtractionResult> {

    if(!isSupportedMediaType(mimeType)){
        throw new Error(`Formato de imagem não suportado: ${mimeType}`);
    }

    const base64Data = buffer.toString("base64");


    const response = await client.messages.create({
        model: "claude-haiku-4-5",
        max_tokens: 4096,
        system: EXTRACT_IMAGE_SYSTEM_PROMPT,
        tools: [{
            name: "return_extracted_text",
            description: "Retorna o texto extraído da imagem.",
            input_schema: {
                type: "object",
                properties: {
                    text: {
                        type: "string",
                        description: "Todo o texto visível na imagem, exatamente como aparece, preservando quebras de linha e estrutura. Sem prefácios, sem comentários, sem interpretações."
                    }
                },
                required: ["text"]
            }
        }],
        tool_choice: { type: "tool", name: "return_extracted_text" },
        messages: [{
            role: "user",
            content: [
                {
                    type: "image",
                    source: {
                        type: "base64",
                        media_type: mimeType,
                        data: base64Data
                    }
                },
                {
                    type: "text",
                    text: "Extraia todo o texto desta imagem."
                }
            ]
        }]
    });

    const toolUseBlock = response.content.find(
        (block): block is Anthropic.ToolUseBlock => block.type === "tool_use"
    );

    if (!toolUseBlock) {
        throw new Error("Modelo não retornou tool use");
    }

    const extracted = toolUseBlock.input as { text: string };
    const rawText = extracted.text.trim();

    const truncated = rawText.length > MAX_CHARS;
    const text = truncated ? rawText.slice(0, MAX_CHARS) : rawText;

    return {
        text,
        truncated,
        method: "vision"
    };

}
