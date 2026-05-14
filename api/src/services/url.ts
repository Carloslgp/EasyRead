import { JSDOM } from "jsdom"
import { Readability } from "@mozilla/readability"
import { url } from "node:inspector";
import { response } from "express";
import { promises as dns } from "node:dns";
import { isIP } from "node:net";
import { truncate } from "node:fs";



const PRIVATE_IP_PATTERNS = [
    /^127\./,                         
    /^10\./,                          
    /^192\.168\./,                    
    /^172\.(1[6-9]|2\d|3[01])\./,     
    /^169\.254\./,                    
    /^::1$/,                          
    /^fc/, /^fd/,                     
    /^fe80:/,                         
];

function isPrivateIp(ip: string): boolean {
    return PRIVATE_IP_PATTERNS.some(pattern => pattern.test(ip));
}

async function validateUrlIsPublic(hostname:string) {

    const cleanHost = hostname.replace(/^\[|\]$/g, "");
    
    if(isIP(cleanHost)){
        if(isPrivateIp(cleanHost)){
            throw new Error("URL aponta para endereço interno")
        }
        return
    }

    try {
        const addresses = await dns.lookup(cleanHost, { all: true });
        
        for (const { address } of addresses) {
            if (isPrivateIp(address)) {
                throw new Error("URL aponta para endereço interno.");
            }
        }
    } catch (err) {
        if (err instanceof Error && err.message.includes("interno")) {
            throw err; 
        }
        throw new Error("Não foi possível resolver o endereço da URL.");
    }


}


function cleanExtractedText(raw: string): string {
    return raw
        .replace(/[ \t]+/g, " ")           // múltiplos espaços/tabs → 1 espaço
        .replace(/ *\n */g, "\n")          // espaços antes/depois de \n → remove
        .replace(/\n{3,}/g, "\n\n")        // 3+ quebras → 2
        .trim();
}

const MAX_CHARS = 50_000

export type UrlExtractionResult = {
    text: string;
    truncated: boolean;
    method: "url";
}

export async function extractTextFromUrl(url: string): Promise<UrlExtractionResult> {

    let parsedUrl: URL
    try{
        parsedUrl = new URL(url)
    }catch{
        throw new Error("URL inválida")
    }

    if(!["http:", "https:"].includes(parsedUrl.protocol)){
        throw new Error("Apenas URLs HTTP ou HTTPS são suportadas.")
    }

    await validateUrlIsPublic(parsedUrl.hostname);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15_000);

    let html: string
    try{
        const response = await fetch(url, {
            signal: controller.signal,
            headers:{
                "User-Agent": "Mozilla/5.0 (compatible; EasyReadBot/1.0)",
            }
        })

        if(!response.ok){
            throw new Error(`A página retornou status ${response.status}.`)
        }

        const contentType = response.headers.get("content-type") || ""
        if (!contentType.includes("text/html")) {
            throw new Error("A URL não aponta para uma página HTML.")
        }

        html = await response.text()

        } finally {
            clearTimeout(timeout)
        }

        const dom = new JSDOM(html, { url })
        const reader = new Readability(dom.window.document)
        const article = reader.parse()


        if (!article || !article.textContent) {
            throw new Error("Não foi possível extrair conteúdo desta página.");
        }

        const rawText = article.textContent.trim();
        const cleaned = cleanExtractedText(rawText);

        if (cleaned.length < 100) {
            throw new Error("A página tem pouco conteúdo de texto. Tente outra URL.");
        }

        const truncated = cleaned.length > MAX_CHARS;
        const text = truncated ? cleaned.slice(0, MAX_CHARS) : cleaned;
        
        return {
            text,
            truncated,
            method: "url"
        }

    }






