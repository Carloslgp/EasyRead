import { useState } from "react";
import Paragraph from "./ui/Paragraph"
import ReadingScale from "./ui/ReadingScale"
import Button from "./ui/Button"



function Form(){
    const [gradeIndex, setGradeIndex] = useState(5);
    return(

        <div className="mt-10 pt-10 border-t border-b border-1 border-border">

            
            <div>

                <div className="w-full">
                    <div className="flex items-center justify-between mb-6">
                        <Paragraph label="TEXTO ORIGINAL"/>

                        <Paragraph label="CLAUSULA DE COTRATO DE ALUGUEL" />
                    </div>

                    <textarea
                        className="
                            w-full
                            max-w-2xl
                            mx-auto
                            text-left
                            block
                            min-h-[300px]
                            bg-original
                            border border-text_border
                            rounded-lg
                            py-4
                            px-7
                            font-serif
                            text-[14px]
                            leading-9
                            text-ink
                            outline-none
                            resize-none
                            focus:ring-1
                        "
                    />

                    <div className="my-2 border-b border-1 border-border">
                        <div className="flex justify-between items-center">
                            <Paragraph valor={582} label="CARACTERE"/>
                            <Paragraph valor={2} label="PARÁGRAFO"/>
                            <div className="hidden md:block">
                                <Paragraph label="PORTUGUÊS FORMAL" />
                            </div>
                        </div>
                        <div className="flex justify-around items-center my-2 mb-5">
                            <Button label="COLAR"/>
                            <Button label="ENVIAR ARQUIVO"/>
                        </div>
                    </div>

                    <div className="flex-row  mb-8">
                        <Paragraph label="OBSERVAÇÃO DO EDITOR"/>
                        <p className="mt-2 reading-text">{'O trecho acima reúne três marcas típicas da redação jurídica: períodos longos, vocabulário técnico e expressões latinas. Ao lado, a reescrita preserva o sentido, mas distribui a informação em frases curtas.'}</p>

                    </div>


                </div>

                <div>
                    <div>
                        <Paragraph label="VERSÃO SIMPLIFICADA"/>
                        <p>NÍVEL DE LEITURA - 6.º ano</p>
                    </div>

                    <div>
                        <div>
                            <Paragraph label="REESCRITA AUTOMÁTICA"/>

                            <Paragraph valor = {40} label="SEGUNDOS DE LEITURA"/>
                        </div>
                        
                        <input type="text" name="" id="" />

                        <div>

                            <Paragraph valor = {78} label="PALAVRA"/>

                            <Paragraph valor = {5} label="PARÁGRAFO"/>


                        </div>

                    </div>

                    <div>

                        <ReadingScale gradeIndex={gradeIndex} setGradeIndex={setGradeIndex}/>
                        
                    </div>

                </div>

            </div>



            <div>

                <button>Simplificar texto</button>

                <Paragraph label="GRÁTIS · SEM CADASTRO · SEUES TEXTOS NÃO SÃO ARMAZENADOS" />

            </div>

        </div>


    )
}


export default Form