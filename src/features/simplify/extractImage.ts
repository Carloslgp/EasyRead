import { useState } from "react";
import { extractImage } from "../../services/api";

type ExtractData = {
    text: string;
    truncated?: boolean;
};

export function useExtractImage() {
    const [data, setData] = useState<ExtractData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleExtract(file: File) {
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!allowedTypes.includes(file.type)) {
            setError("Apenas imagens JPEG, PNG ou WEBP são aceitas.");
            return;
        }
        if (file.size > 20 * 1024 * 1024) {
            setError("Imagem muito grande. Máximo: 20MB.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await extractImage(file);
            setData({
                text: response.text,
                truncated: response.truncated,
            });
        } catch (err) {
            console.error("Erro ao extrair imagem:", err);
            setError(err instanceof Error ? err.message : "Erro ao extrair imagem.");
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