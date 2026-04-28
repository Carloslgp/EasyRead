import { Router, Request, Response } from "express";
import multer from "multer";
import { extractTextFromPdf } from "../services/pdf.js";
import type { ExtractResponse } from "../types/index.js";

const router = Router();


/**
 * Configuração do multer:
 * - Armazena em memória (não em disco)
 * - Limita tamanho a 10MB
 * - Aceita só PDF
 */
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
    },
    fileFilter: (_req, file, cb) => {
        if(file.mimetype !== "application/pdf") {
            return cb(new Error("Apenas arquivos PDF são aceitos."))
        }        
        cb(null, true)
    }
})

router.post("/extract/pdf", upload.single("file"), async (req: Request, res: Response) =>{

    if(!req.file){
        return res.status(400).json({error: "Nenhum arquivo encontrado"})
    }

    try {
        const extraction = await extractTextFromPdf(req.file.buffer);

        const response: ExtractResponse = {
            text: extraction.text,
            source: extraction.method === "native" ? "pdf-native" : "pdf-vision",
            pages: extraction.pages,
            truncated: extraction.truncated,
        };

        res.json(response);

    } catch (error) {

        console.error("Erro ao extrair PDF:", error);

        const message = error instanceof Error ? error.message : "Erro desconhecido.";
        res.status(500).json({
            error: "Não foi possível extrair o texto deste PDF. Verifique se ele está legível e tente novamente.",
            detail: message,
        });

    }

})

export default router;

