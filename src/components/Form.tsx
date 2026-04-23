import Paragraph from "./ui/Paragraph"



function Form(){
    return(

        <div>

            
            <div>

                <div>
                    <div>
                        <p>TEXTO ORIGINAL · I</p>

                        <p>CLÁUSULA DE CONTRATO DE ALUGUEL</p>
                    </div>

                    <input type="text" name="" id="" />

                    <div>
                        <Paragraph valor={582} label="CARACTERE"/>
                        <Paragraph valor={2} label="PARÁGRAFO"/>
                        <p>PORTUGUÊS FORMAL</p>
                        <p>COLAR</p>
                        <p>ENVIAR ARQUIVO</p>
                    </div>

                    <div>
                        <p>OBSERVAÇÃO DO EDITOR</p>
                        <p>O trecho acima reúne três marcas típicas da redação jurídica: períodos longos, vocabulário técnico e expressões latinas. Ao lado, a reescrita preserva o sentido, mas distribui a informação em frases curtas.</p>

                    </div>


                </div>

                <div>
                    <div>
                        <p>VERSÃO SIMPLIFICADA · II</p>
                        <p>NÍVEL DE LEITURA - 6.º ano</p>
                    </div>

                </div>

            </div>


            <div>

            </div>

        </div>


    )
}


export default Form