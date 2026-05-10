const principles = [
    {
        label: "Frases curtas",
        text: "No máximo 20 palavras por frase. Uma ideia por vez.",
    },
    {
        label: "Vocabulário comum",
        text: "Palavras do dia a dia, no lugar de termos técnicos ou jurídicos.",
    },
    {
        label: "Voz ativa",
        text: "Quem faz a ação aparece primeiro. Menos rodeios, mais clareza.",
    },
    {
        label: "Leitura respirável",
        text: "Linhas de 65 a 75 caracteres. Espaço em branco como ferramenta.",
    },
];

const labelClass =
    "font-sans text-[11px] font-medium uppercase tracking-widest text-muted md:text-[10px]";

function Principles() {
    return (
        <section
            id="principios"
            aria-labelledby="principios-heading"
            className="border-t border-border pt-10 pb-16 md:pt-12 md:pb-20"
        >
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                <div className="lg:col-span-4">
                    <h2 id="principios-heading" className={`mb-3 ${labelClass}`}>
                        Princípios editoriais
                    </h2>
                    <p className="font-serif italic text-muted text-[18px] leading-[1.7]">
                        Escrever simples é um ato de respeito.
                    </p>
                </div>

                <dl className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-8">
                    {principles.map(({ label, text }) => (
                        <div key={label}>
                            <dt className={`mb-2 ${labelClass}`}>{label}</dt>
                            <dd className="font-serif text-ink text-[16px] leading-[1.65]">
                                {text}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}

export default Principles;
