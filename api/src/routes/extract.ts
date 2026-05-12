import { Router, Request, Response } from "express";
import multer from "multer";
import { extractTextFromPdf } from "../services/pdf.js";
import type { ExtractResponse } from "../types/index.js";
import { extractTextFromImage } from "../services/image.js";
import { extractTextFromUrl } from "../services/url.js";
import { extractLimiter } from "../middlewares/rateLimit.js";

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

const uploadImage = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 20 * 1024 * 1024, // 20MB
    },
    fileFilter: (_req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error("Apenas imagens JPEG, PNG ou WEBP são aceitas."));
        }
        cb(null, true);
    },
});

router.post("/extract/pdf", extractLimiter, upload.single("file"), async (req: Request, res: Response) =>{

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


router.post("/extract/image",extractLimiter, uploadImage.single("file"), async (req: Request, res: Response) => {

        if (!req.file) {
            return res.status(400).json({ error: "Nenhuma imagem enviada." });
        }

        try {
            const extraction = await extractTextFromImage(
                req.file.buffer,
                req.file.mimetype
            );

            const response: ExtractResponse = {
                text: extraction.text,
                source: "image",
                truncated: extraction.truncated,
            };

            res.json(response);

        } catch (error) {
            console.error("Erro ao extrair imagem:", error);
            const message = error instanceof Error ? error.message : "Erro desconhecido.";
            res.status(500).json({
                error: "Não foi possível extrair o texto desta imagem. Verifique se ela está legível e tente novamente.",
                detail: message,
            });
        }

    }
    
);


router.post("/extract/url",extractLimiter, async(req: Request, res: Response) => {

    const { url } = req.body as { url?: string }

    if (!url || typeof url !== "string") {
        return res.status(400).json({ error: "Campo 'url' é obrigatório." });
    }

    try{
        const extraction = await extractTextFromUrl(url)

        const response: ExtractResponse = {
            text: extraction.text,
            source: "url",
            truncated: extraction.truncated,
        }

        res.json(response)
    }catch(error){

        console.error("Erro ao extrair URL:", error);
        const message = error instanceof Error ? error.message : "Erro desconhecido.";
        res.status(500).json({
            error: message,
            detail: message,
        });

    }



})




export default router;

