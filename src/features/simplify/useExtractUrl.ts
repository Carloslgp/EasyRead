import { useState } from "react";
import { extractUrl } from "../../services/api";

type ExtractData = {
    text: string,
    truncated?: boolean
}

export function useExtractUrl(){
    const [data, setData] = useState<ExtractData | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    async function handleExtract(url: string){
        const trimmed = url.trim();
        if (!trimmed) {
            setError("Cole um link primeiro.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await extractUrl(trimmed);
            setData({
                text: response.text,
                truncated: response.truncated,
            });
        } catch (err) {
            console.error("Erro ao extrair URL:", err);
            setError(err instanceof Error ? err.message : "Erro ao extrair URL.");
        } finally {
            setLoading(false);
        }
    }

    function reset() {
        setData(null);
        setError("");
    }

    return { data, loading, error, handleExtract, reset };

}




