import { PDFParse } from "pdf-parse";

/**
 * Limite máximo de caracteres extraídos.
 * Evita estourar contexto da Anthropic com PDFs gigantes.
 * Aproximadamente 50.000 chars = ~12.500 tokens, dentro do confortável.
 */

function cleanExtractedText(raw: string): string {
    return raw
        // Remove "-- 1 of 6 --" e variações
        .replace(/-- \d+ of \d+ --/g, "")
        // Remove números de página soltos em linha própria (1-3 dígitos)
        .replace(/^\s*\d{1,3}\s*$/gm, "")
        // Colapsa 3+ quebras de linha em 2 (preserva parágrafos, remove vazios excessivos)
        .replace(/\n{3,}/g, "\n\n")
        .trim();
}
const MAX_CHARS = 50_000;
export type PdfExtractionResult = {
    text: string;
    pages: number;
    truncated: boolean;
    method: "native" | "vision";
};


export async function extractTextFromPdf(buffer: Buffer): Promise<PdfExtractionResult> {

    const parser = new PDFParse({data:buffer});

    try{
        const result = await parser.getText()
        const cleaned = cleanExtractedText(result.text);


        if(cleaned.length < 50){
            throw new Error("PDF parece ser escaneado — extração nativa falhou. Fallback para vision ainda não implementado.");
        }

        const truncated = cleaned.length > MAX_CHARS
        const text =  truncated ? cleaned.slice(0, MAX_CHARS) : cleaned

        return {
            text,
            pages: result.pages?.length ?? 0,
            truncated,
            method: "native"
        }    





    }finally{
        
        await parser.destroy()

    }

}
