import { useState } from "react";
import { extractPdf } from "../../services/api";

type ExtractData = {
    text: string;
    pages?: number;
    truncated?: boolean
}

export function useExtractPdf(){
    const [data, setData] = useState<ExtractData | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    async function handleExtract(file:File) {
        
        if (file.type !== "application/pdf") {
            setError("Apenas arquivos PDF são aceitos.");
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            setError("Arquivo muito grande. Máximo: 10MB.");
            return;
        }

        setLoading(true);
        setError("");

        try{
            const response = await extractPdf(file)

            setData({
                text: response.text,
                pages: response.pages,
                truncated: response.truncated,
            })


        }catch(error){
            
            console.error("Erro ao extrair PDF:", error);
            setError(error instanceof Error ? error.message : "Erro ao extrair PDF.");

        }finally {
            setLoading(false);
        }


        

    }
    
    function reset() {
        setData(null);
        setError("");
    } 
    
    
    return { data, loading, error, handleExtract, reset };


}



