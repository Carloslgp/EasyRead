import Anthropic from "@anthropic-ai/sdk";
import type {SimplifyResponse } from "../types/index.js";
import { SIMPLIFY_SYSTEM_PROMPT } from "../lib/prompt.js";

const client = new Anthropic()


export async function simplifyDocument(
    text: string,
    grade: string
): Promise<SimplifyResponse> {

    const response = await client.messages.create({
            model: "claude-haiku-4-5",
            max_tokens: 2048,
            system: SIMPLIFY_SYSTEM_PROMPT,
            tools: [{
                name: "return_simplified_document",
                description: "Retorna o documento simplificado de forma estruturada.",
                input_schema: {
                    type: "object",
                    properties: {
                        result: {
                            type: "string",
                            description: "Texto simplificado em linguagem clara, com markdown para ênfase (negrito, listas)."
                        },
                        documentType: {
                            type: "string",
                            description: "Tipo do documento detectado (ex: 'Bula de medicamento', 'Cláusula de contrato')."
                        },
                        register: {
                            type: "string",
                            description: "Registro linguístico do texto original (ex: 'Português jurídico formal')."
                        },
                        editorNote: {
                            type: "string",
                            description: "Nota explicando as principais mudanças feitas pelo editor."
                        }
                    },
                    required: ["result", "documentType", "register", "editorNote"]
                }
            }],
            tool_choice: { type: "tool", name: "return_simplified_document" },
            messages: [
                {
                    role: "user",
                    content: `Simplifique o seguinte texto para o nível ${grade}:\n\n${text}`
                }
            ]
    });

    const toolUseBlock = response.content.find(
        (block): block is Anthropic.ToolUseBlock => block.type === "tool_use"
    )
    if(!toolUseBlock) {
        throw new Error("Modelo não retornou tool use")
    }    

    return toolUseBlock.input as SimplifyResponse;

}    