import { useState } from "react";
import Paragraph from "./ui/Paragraph"
import ReadingScale from "./ui/ReadingScale"
import Button from "./ui/Button"
import ResponseBox from "./ui/ResponseBox";
import { useSimplify } from "../features/simplify/useSimplify";

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
    "Superior",
    "Mestrado",
    "Doutorado"
];


function Form(){
    const [gradeIndex, setGradeIndex] = useState(5);
    const [text, setText] = useState("");
    const { data, loading, error, handleSimplify } = useSimplify();
    return(

        <section className="mt-10 border-t border-border pt-8 md:mt-12 md:pt-8">

            <div className="mx-auto md:grid md:max-w-[760px] md:grid-cols-2 md:gap-x-8 lg:max-w-[1120px] lg:gap-x-10 xl:max-w-[1280px] xl:gap-x-12">

                <div className="w-full">
                    <div className="mb-6 flex min-h-6 items-center justify-between gap-4 md:mb-5">
                        <Paragraph label="TEXTO ORIGINAL - I"/>

                        <Paragraph label="CLÁUSULA DE CONTRATO DE ALUGUEL" />
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
                            <Paragraph valor={582} label="CARACTERE"/>
                            <Paragraph valor={1} label="PARÁGRAFO"/>
                            <div className="hidden md:block">
                                <Paragraph label="PORTUGUÊS FORMAL" />
                            </div>
                            <div className="hidden md:block">
                                <Button label="COLAR"/>
                            </div>
                            <div className="hidden md:block">
                                <Button label="ENVIAR ARQUIVO"/>
                            </div>
                        </div>
                        <div className="my-2 mb-5 flex items-center justify-around md:hidden">
                            <Button label="COLAR"/>
                            <Button label="ENVIAR ARQUIVO"/>
                        </div>
                    </div>

                    <div className="mb-8 pt-3 md:mb-0 md:pt-5">
                        <Paragraph label="OBSERVAÇÃO DO EDITOR"/>
                        <p className="reading-text mt-2 italic md:text-[12px] md:leading-7">{'O trecho acima reúne três marcas típicas da redação jurídica: períodos longos, vocabulário técnico e expressões latinas. Ao lado, a reescrita preserva o sentido, mas distribui a informação em frases curtas.'}</p>

                    </div>


                </div>

                <div className="mt-10 md:mt-0">
                    <div className="mb-2 flex min-h-6 items-center justify-between gap-4 md:mb-5">
                        <Paragraph label="VERSÃO SIMPLIFICADA - II"/>
                        <p className="whitespace-nowrap bg-back_blue px-2 py-1 font-sans text-[10px] font-medium uppercase tracking-widest text-text_blue md:text-[8px] lg:text-[10px]">
                            • NÍVEL DE LEITURA — {grades[gradeIndex]}
                        </p>
                    </div>

                    <div className="mb-4 mt-2 box-border flex flex-col items-center justify-between rounded-[3px] border border-border bg-box_white p-4 shadow-sm md:mt-0 md:min-h-[396px] md:p-7 lg:min-h-[520px] lg:p-10 xl:min-h-[550px]">

                        <div className="flex w-full items-center justify-between border-b border-border pb-4 text-center">
                            <Paragraph label="REESCRITA AUTOMÁTICA"/>

                            <Paragraph valor = {40} label="SEGUNDO DE LEITURA"/>
                        </div>
                        
                        <div className="my-5 w-full flex-1 font-serif text-[15px] leading-8 text-ink md:my-6 md:text-[13px] md:leading-7 lg:text-[16px] lg:leading-8">
                            <ResponseBox>
                                <div className="space-y-4">
                                    
                                </div>
                            </ResponseBox>
                        </div>

                        <div className="flex w-full items-center justify-between gap-4 border-t border-border pt-4">
                            <div className="flex items-center gap-4">
                                <Paragraph valor = {78} label="PALAVRA"/>
                                <Paragraph valor = {5} label="FRASE"/>
                            </div>

                            <div className="flex items-center gap-3 font-sans text-[11px] text-muted md:text-[9px] lg:text-[11px]">
                                <button type="button" className="hover:text-ink">Copiar</button>
                                <button type="button" className="hover:text-ink">Baixar PDF</button>
                                <button type="button" className="hover:text-ink">Ouvir</button>
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
