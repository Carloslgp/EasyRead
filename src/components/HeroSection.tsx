function HeroSection(){
    return (
        <div className="md:flex">

            <div className="md:w-3/5">
                <p className=" pt-10 font-sans text-[12px] md:text-xs font-medium text-muted tracking-widest">
                    FERRAMENTA PUBLICA
                </p>
                <h2 className="font-serif text-[40px] font-normal py-6">
                    Textos difíceis, <br/> <em>entendidos.</em>
                </h2>
                <p className="pr-12 text-left py-3 pb-7 md:pb-0 font-serif text-[20px] md:text-xl font-normal text-muted">
                    Uma ferramenta que reescreve contratos, bulas e cartas oficiais em linguagem simples, para pessoas com dislexia, deficiência intelectual, baixa escolaridade e idosos.
                </p>

            </div>

            <div className="md:flex md:flex-col md:items-end md:w-2/5 md:justify-end">

                <div className="md:text-right">
                    <p className="pt-3 pb-1 font-sans text-[12px] md:text-xs font-medium text-muted tracking-widest">
                        PUBLICAÇÃO
                    </p>
                
                    <p className="font-serif text-lg">
                        Abril de 2026, Curitiba
                    </p>
                </div>

                <div className="md:text-right">
                    <p className="pt-3 pb-1 font-sans text-[12px] md:text-xs font-medium text-muted tracking-widest">
                        BASE LEGAL
                    </p>

                    <p className="font-serif text-lg"> 
                        Lei 14.129 / 2021
                    </p>
                    <p className="font-serif text-muted font-normal text-base">
                        Linguagem Simples
                    </p>
                </div>

            </div>

        </div>
    )
}

export default HeroSection



