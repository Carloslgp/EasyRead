import {Router, Request, Response} from 'express'
import { SimplifyRequest, SimplifyResponse } from '../types/index.js'
import { simplifyDocument } from '../services/anthropic.js'
import { simplifyLimiter } from "../middlewares/rateLimit.js";

const router = Router()

router.post("/simplify", simplifyLimiter, async (req:Request, res: Response) => {
    const {text, grade} = req.body as SimplifyRequest

    if(!text || typeof text !== "string") {
        return res.status(400).json({error: "Campo 'text' é obrigatório e deve ser uma string!"})
    }

    if(!grade || typeof grade !== "string") {
        return res.status(400).json({error: "Campo 'grade' é obrigatório e deve ser uma string!"})
    }

    try{
        const result = await simplifyDocument(text, grade)
        res.json(result)
    }catch(error) {

        console.error("Erro ao simplificar documento:", error)
        res.status(500).json({
            error: "Erro ao processar o documento. Por favor, tente novamente mais tarde."
        })

    }

})

export default router;