import {Router, Request, Response} from 'express'
import { SimplifyRequest, SimplifyResponse } from '../types/index.js'

const router = Router()

router.post("/simplify", (req:Request, res: Response) => {
    const {text, grade} = req.body as SimplifyRequest

    if(!text || typeof text !== "string") {
        return res.status(400).json({error: "Campo 'text' é obrigatório e deve ser uma string!"})
    }

    if(!grade || typeof grade !== "string") {
        return res.status(400).json({error: "Campo 'grade' é obrigatório e deve ser uma string!"})
    }

    const mockResponse: SimplifyResponse = {
        result: "Este é um texto **simplificado** de exemplo. Ele tem frases curtas. Palavras comuns. Fácil de entender.",
        documentType: "Documento de exemplo",
        register: "Português formal",
        editorNote: `Texto simplificado para o nível ${grade}. Esta é uma resposta mock — a integração com IA será feita na próxima etapa.`
    }

    setTimeout(() => {
        res.json(mockResponse);
    }, 1500);
        
})

export default router;