import type { ExtractResponse } from "../types";


const API_URL = import.meta.env.VITE_API_URL

export async function extractPdf(file: File): Promise<ExtractResponse> {

    const formData = new FormData()

    formData.append("file", file)

    const response = await fetch(`${API_URL}/api/extract/pdf`, {
        method: "POST",
        body: formData,
    });

    if(!response.ok){
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || "Erro ao extrair o texto do PDF")
    }

    return response.json()

}


export async function extractImage(file: File): Promise<ExtractResponse> {

    const formData = new FormData()

    formData.append("file", file)

    const response = await fetch(`${API_URL}/api/extract/image`, {
        method: "POST",
        body: formData,
    })

    if(!response.ok){
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || "Erro ao extrait texto da imagem")
    }

    return response.json()

}

export async function extractUrl(url:string): Promise<ExtractResponse> {
    
    const response = await fetch(`${API_URL}/api/extract/url`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({url})
    })

    if(!response.ok){
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || "Erro ao extrair url")
    }

    return response.json()



}




