import { useState, useEffect, useRef } from "react";
import Paragraph from "./ui/Paragraph"
import ReadingScale from "./ui/ReadingScale"
import Button from "./ui/Button"
import ResponseBox from "./ui/ResponseBox";
import { useSimplify } from "../features/simplify/useSimplify";
import { useExtractPdf } from "../features/simplify/useExtractPdf";
import { useExtractImage } from "../features/simplify/extractImage";
import { useExtractUrl } from "../features/simplify/useExtractUrl";
import { useSpeechSynthesis } from "../hooks/useSpeechSynthesis";

const grades = [
    "1.º ano",
    "2.º ano",
    "3.º ano",
    "4.º ano",
    "5.º ano",
    "6.º ano",
    "7.º ano",
    "8.º ano",
    "9.º ano",
    "Médio",
    "Superior"
];
function countSentences(text: string): number {
  if (!text) return 0;
  
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  let count = 0;
  
  for (const line of lines) {

    const content = line.replace(/^[\*\-•]\s*/, '').trim();
    if (!content) continue;
    

    const sentences = content.match(/[^.!?]+[.!?]+/g);
    
    if (sentences && sentences.length > 0) {
      count += sentences.length;

      const lastChar = content.trim().slice(-1);
      if (!'.!?'.includes(lastChar)) {
        count += 1;
      }
    } else {

      count += 1;
    }
  }
  
  return count;
}


function Form(){
    const [gradeIndex, setGradeIndex] = useState(5);
    const [text, setText] = useState("");
    const [copied, setCopied] = useState(false);
    const { data, loading, error, handleSimplify } = useSimplify();


    const { speak, stop, isSpeaking, supported: ttsSupported } = useSpeechSynthesis();

    const { 
        data: extractData, 
        loading: extractLoading, 
        error: extractError, 
        handleExtract 
    } = useExtractPdf();

    useEffect(() => {
        if (extractData?.text) {
            setText(extractData.text);
        }
    }, [extractData]);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const { 
        loading: imageLoading, 
        handleExtract: handleExtractImage,
        data: imageData,
    } = useExtractImage();

    const imageInputRef = useRef<HTMLInputElement>(null);


    const { 
        data: urlData, 
        loading: urlLoading, 
        error: urlError, 
        handleExtract: handleExtractUrl,
    } = useExtractUrl();

    const [urlInput, setUrlInput] = useState("");

    useEffect(() => {
    if (urlData?.text) {
        setText(urlData.text);
    }
    }, [urlData]);

    useEffect(() => {
    if (imageData?.text) {
        setText(imageData.text);
    }
    }, [imageData]);

    const charCount = text.length;
    const paragraphCount = text.trim() ? text.split(/\n\s*\n/).length : 0;
    const wordCount = data?.result ? data.result.replace(/\*\*/g, "").trim().split(/\s+/).filter(Boolean).length : 0;
    const sentenceCount = data?.result ? countSentences(data.result) : 0;
    const urlStatusMessage = urlLoading
        ? "Extraindo texto do link, aguarde."
        : urlError
            ? `Não foi possível extrair o texto do link. ${urlError}`
            : urlData?.truncated
                ? "Texto extraído do link, mas cortado em 50.000 caracteres. Considere simplificar partes menores."
                : urlData
                    ? "Texto extraído do link com sucesso."
                    : "";
    const urlStatusClassName = urlError
        ? "text-red-700"
        : urlData?.truncated
            ? "text-yellow-700"
            : urlData
                ? "text-green-700"
                : "text-muted";


    function openFilePicker() {
        fileInputRef.current?.click();
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            handleExtract(file);
        }
        e.target.value = "";
    }

    function openImagePicker() {
        imageInputRef.current?.click();
    }

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            handleExtractImage(file);
        }
        e.target.value = "";
    }

    async function handleCopy() {
        const result = data?.result;
        if (!result) return;
        const plain = result.replace(/\*\*/g, "");
        await navigator.clipboard.writeText(plain);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    }

    function handleUrlSubmit() {
        handleExtractUrl(urlInput);
    }

    function handleOuvirClick() {
        if (isSpeaking) {
            stop();
        } else if (data?.result) {
            speak(data.result);
        }
    }

    async function handleColar() {
        try {
            const clipText = await navigator.clipboard.readText();
            if (!clipText) return;
            setText(clipText);
        } catch (err) {
            console.error("Erro ao colar:", err);
        }
    }   





    return(

        <section id="simplificar" className="mt-10 border-t border-border pt-8 md:mt-12 md:pt-8" aria-label="Ferramenta de simplificação de texto">
            <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
                aria-hidden="true"
            />
            <input
                ref={imageInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                capture="environment"
                onChange={handleImageChange}
                className="hidden"
                aria-hidden="true"
            />

            <div id="como-funciona" className="mx-auto md:grid md:max-w-[760px] md:grid-cols-2 md:gap-x-8 lg:max-w-[1120px] lg:gap-x-10 xl:max-w-[1280px] xl:gap-x-12">

                <div className="w-full">
                    <div className="mb-6 flex min-h-6 items-center justify-between gap-4 md:mb-5">
                        <Paragraph label="TEXTO ORIGINAL - I"/>

                        <div aria-live="polite" aria-atomic="true">
                            <Paragraph label={data?.documentType?.toUpperCase() ?? "AGUARDANDO TEXTO"} />
                        </div>
                    </div>

                    <textarea
                        aria-label="Texto original"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="
                            w-full
                            max-w-2xl
                            md:max-w-none
                            mx-auto
                            text-left
                            block
                            min-h-[300px]
                            md:min-h-[304px]
                            lg:min-h-[420px]
                            xl:min-h-[450px]
                            bg-original
                            border border-text_border
                            rounded-[3px]
                            py-4
                            px-7
                            md:px-5
                            md:py-5
                            lg:px-8
                            lg:py-7
                            font-serif
                            text-[15px]
                            leading-9
                            md:text-[15px]
                            md:leading-8
                            lg:text-[17px]
                            lg:leading-8
                            text-ink
                            outline-none
                            resize-none
                            focus:ring-1
                        "
                    />

                <div className="my-2 border-b border-border md:mb-0 md:pb-5">
                    <div className="flex items-start justify-between gap-3">
                        <Paragraph valor={charCount} label="CARACTERE"/>
                        <Paragraph valor={paragraphCount} label="PARÁGRAFO"/>
                        <div className="hidden md:block">
                            <Paragraph label={data?.register?.toUpperCase() ?? "PORTUGUÊS FORMAL"} />
                        </div>
                        <div className="hidden md:block">
                            <Button label="COLAR" onClick={handleColar} aria-label="Colar texto da área de transferência (em breve)"/>
                        </div>
                        <div className="hidden md:block">
                            <Button 
                                label={imageLoading ? "EXTRAINDO..." : "TIRAR FOTO"}
                                onClick={openImagePicker}
                                disabled={imageLoading}
                            />
                        </div>
                        <div className="hidden md:block">
                            <Button 
                                label={extractLoading ? "EXTRAINDO..." : "ENVIAR ARQUIVO"}
                                onClick={openFilePicker}
                                disabled={extractLoading}
                            />
                        </div>
                    </div>
                    <div className="my-2 mb-5 flex items-center justify-around md:hidden">
                        <Button label="COLAR" aria-label="Colar texto da área de transferência (em breve)" disabled />
                        <Button 
                            label={imageLoading ? "EXTRAINDO..." : "TIRAR FOTO"}
                            onClick={openImagePicker}
                            disabled={imageLoading}
                        />
                        <Button 
                            label={extractLoading ? "EXTRAINDO..." : "ENVIAR ARQUIVO"}
                            onClick={openFilePicker}
                            disabled={extractLoading}
                        />
                    </div>
                </div>

                <div className="my-3 flex items-center gap-2 md:my-4">
                    <input
                        type="url"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleUrlSubmit();
                            }
                        }}
                        aria-label="URL para extração de texto"
                        placeholder="Cole um link aqui..."
                        disabled={urlLoading}
                        className="
                            flex-1
                            min-w-0
                            border border-text_border
                            bg-original
                            rounded-[3px]
                            px-3 py-2
                            font-sans text-[13px]
                            text-ink
                            outline-none
                            focus:ring-1
                            disabled:opacity-50
                            md:text-[12px]
                            lg:text-[13px]
                        "
                    />
                    <button
                        type="button"
                        aria-label={urlLoading ? "Extraindo texto do link, aguarde" : "Extrair texto do link"}
                        onClick={handleUrlSubmit}
                        disabled={urlLoading || !urlInput.trim()}
                        className="
                            font-sans text-[10px] font-medium uppercase tracking-widest
                            text-muted
                            transition-colors duration-200
                            hover:text-ink
                            disabled:opacity-50 disabled:cursor-not-allowed
                            md:text-[8px] lg:text-[10px]
                            whitespace-nowrap
                        "
                    >
                        {urlLoading ? "EXTRAINDO..." : "EXTRAIR LINK"}
                    </button>
                </div>

                <p
                    role={urlError ? "alert" : "status"}
                    aria-live={urlError ? "assertive" : "polite"}
                    aria-atomic="true"
                    className={`min-h-4 font-sans text-[11px] md:text-[10px] lg:text-[11px] ${urlStatusClassName}`}
                >
                    {urlStatusMessage}
                </p>

                <div className="mb-8 pt-3 md:mb-0 md:pt-5">
                    <Paragraph label="OBSERVAÇÃO DO EDITOR"/>
                    <p className="reading-text mt-2 italic md:text-[12px] md:leading-7">
                        {data?.editorNote ?? "A observação do editor aparecerá aqui após a simplificação."}
                    </p>

                    {extractError && (
                        <p role="alert" className="mt-2 font-sans text-[11px] text-red-700 md:text-[10px] lg:text-[11px]">
                            ⚠ {extractError}
                        </p>
                    )}

                    {extractData?.truncated && (
                        <p role="status" className="mt-2 font-sans text-[11px] text-yellow-700 md:text-[10px] lg:text-[11px]">
                            ⚠ Texto cortado em 50.000 caracteres. Considere simplificar partes menores.
                        </p>
                    )}

                </div>



            </div>

                <div className="mt-10 md:mt-0">
                    <div className="mb-2 flex min-h-6 items-center justify-between gap-4 md:mb-5">
                        <Paragraph label="VERSÃO SIMPLIFICADA - II"/>
                        <p aria-live="polite" aria-atomic="true" className="whitespace-nowrap bg-back_blue px-2 py-1 font-sans text-[10px] font-medium uppercase tracking-widest text-text_blue md:text-[8px] lg:text-[10px]">
                            • NÍVEL DE LEITURA — {grades[gradeIndex]}
                        </p>
                    </div>

                    <div className="mb-4 mt-2 box-border flex flex-col items-center justify-between rounded-[3px] border border-border bg-box_white p-4 shadow-sm md:mt-0 md:min-h-[396px] md:p-7 lg:min-h-[520px] lg:p-10 xl:min-h-[550px]">

                        <div className="flex w-full items-center justify-between border-b border-border pb-4 text-center">
                            <Paragraph label="REESCRITA AUTOMÁTICA"/>

                            <Paragraph valor = {40} label="SEGUNDO DE LEITURA"/>
                        </div>
                        
                        <div className="my-5 w-full flex-1 font-serif text-[15px] leading-8 text-ink md:my-6 md:text-[13px] md:leading-7 lg:text-[16px] lg:leading-8">
                            <ResponseBox 
                                content={data?.result}
                                loading={loading}
                                error={error}
                            />
                        </div>

                        <div className="flex w-full items-center justify-between gap-4 border-t border-border pt-4">
                            <div className="flex items-center gap-4">
                                <Paragraph valor={wordCount} label="PALAVRA"/>
                                <Paragraph valor={sentenceCount} label="FRASE"/>
                            </div>

                            <div className="flex items-center gap-3 font-sans text-[11px] text-muted md:text-[9px] lg:text-[11px]">
                                <button
                                    type="button"
                                    aria-label={copied ? "Texto copiado para a área de transferência" : "Copiar texto simplificado"}
                                    onClick={handleCopy}
                                    disabled={!data?.result}
                                    className="hover:text-ink disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    {copied ? "Copiado!" : "Copiar"}
                                </button>
                                <button
                                    type="button"
                                    aria-label="Baixar versão simplificada em PDF (em breve)"
                                    aria-disabled="true"
                                    disabled
                                    className="hover:text-ink"
                                >Baixar PDF</button>
                                    {ttsSupported && (
                                        <button 
                                            type="button"
                                            onClick={handleOuvirClick}
                                            disabled={!data?.result}
                                            className="hover:text-ink disabled:opacity-50 disabled:cursor-not-allowed"
                                            aria-label={isSpeaking ? "Parar leitura em voz alta" : "Ouvir texto simplificado em voz alta"}
                                        >
                                            {isSpeaking ? "Parar" : "Ouvir"}
                                        </button>
                                    )}
                            </div>
                        </div>

                    </div>

                    <div className="md:mt-5">

                        <ReadingScale gradeIndex={gradeIndex} setGradeIndex={setGradeIndex}/>
                        
                    </div>

                </div>

            </div>



            <div className="flex flex-col items-center py-10 text-center md:pt-12">

                <button onClick={() => handleSimplify(text, grades[gradeIndex])} type="button" className="mb-5 rounded-[3px] bg-button_blue px-6 py-3 font-serif text-paper transition-colors duration-200 hover:bg-text_blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-button_blue focus-visible:ring-offset-2 focus-visible:ring-offset-paper">
                    Simplificar texto
                </button>

                <Paragraph label="GRÁTIS · SEM CADASTRO · SEUS TEXTOS NÃO SÃO ARMAZENADOS" />

            </div>

        </section>


    )
}


export default Form
