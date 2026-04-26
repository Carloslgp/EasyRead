import { useState } from "react";


type SimplifyResponse = {
    result: string;              // texto simplificado (com markdown pra negrito/listas)
    documentType: string;        // "Cláusula de contrato de aluguel"
    register: string;            // "Português formal"
    editorNote: string;          // "O trecho acima reúne três marcas..."
};

export function useSimplify() {

    const [data, setData] = useState<SimplifyResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSimplify(text: string, grade: string) {
        
        setLoading(true);
        setError("")
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/simplify`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text, grade })
            });


            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Erro no servidor");
            }

            const json: SimplifyResponse = await response.json();
            setData(json);

        } catch (err) {
            console.error("Erro no useSimplify:", err);
            setError(err instanceof Error ? err.message : "Erro ao simplificar.");
        } finally {
            setLoading(false);
        }

    }

    return { data, loading, error, handleSimplify };
    
}

