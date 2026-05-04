import { useState, useEffect, useCallback } from "react";


type SpeechSate = "idle" | "speaking" | "paused"


export function useSpeechSynthesis(){
    const [state, setState] = useState<SpeechSate> ("idle")
    const [supported, setSupported] = useState(true)

    useEffect(() => {
        setSupported("speechSynthesis" in window);
    }, []);


    const speak = useCallback((text: string) => {
        if(!("speechSynthesis" in window)) {
            console.warn("Web Speech API não suportada neste navegador.")
            return
        }

        // Limpa markdown antes de fala
        const cleanText = text.replace(/\*\*/g, "").replace(/\*/g, "")

        window.speechSynthesis.cancel();


        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = "pt-BR";
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 1;



        utterance.onstart = () => setState("speaking");
        utterance.onend = () => setState("idle");
        utterance.onerror = () => setState("idle");
        utterance.onpause = () => setState("paused");
        utterance.onresume = () => setState("speaking");

        window.speechSynthesis.speak(utterance);


    }, [])

    const stop = useCallback(() => {
        window.speechSynthesis.cancel()
        setState("idle")
    }, [])


    const pause = useCallback(() => {
        window.speechSynthesis.pause()
    }, [])

    const resume = useCallback(() => {
        window.speechSynthesis.resume()
    }, [])


    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel()
        }
    }, [])

    
    return {
        speak,
        stop,
        pause,
        resume,
        state,
        supported,
        isSpeaking: state === "speaking",
    };

}
