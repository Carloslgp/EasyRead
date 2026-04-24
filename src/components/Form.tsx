import { useState } from "react";
import Paragraph from "./ui/Paragraph"
import ReadingScale from "./ui/ReadingScale"



function Form(){
    const [gradeIndex, setGradeIndex] = useState(5);
    return(

        <div>

            
            <div>

                <div>
                    <div>
                        <Paragraph label="TEXTO ORIGINAL · I"/>

                        <p>CLÁUSULA DE CONTRATO DE ALUGUEL</p>
                    </div>

                    <input type="text" name="" id="" />

                    <div>
                        <Paragraph valor={582} label="CARACTERE"/>
                        <Paragraph valor={2} label="PARÁGRAFO"/>
                        <Paragraph label="PORTUGUÊS FORMAL"/>
                        <p>COLAR</p>
                        <p>ENVIAR ARQUIVO</p>
                    </div>

                    <div>
                        <Paragraph label="OBSERVAÇÃO DO EDITOR"/>
                        <p>O trecho acima reúne três marcas típicas da redação jurídica: períodos longos, vocabulário técnico e expressões latinas. Ao lado, a reescrita preserva o sentido, mas distribui a informação em frases curtas.</p>

                    </div>


                </div>

                <div>
                    <div>
                        <Paragraph label="VERSÃO SIMPLIFICADA · II"/>
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