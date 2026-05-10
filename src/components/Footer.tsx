const columns = [
    {
        heading: "Ferramenta",
        items: [
            { label: "Simplificar texto", href: "#simplificar" },
            { label: "Como funciona", href: "#acessibilidade" },
        ],
    },
    {
        heading: "Recursos",
        items: [
            { label: "Princípios", href: "#principios" },
            { label: "Acessibilidade", href: "#acessibilidade" },
        ],
    },
    {
        heading: "Projeto",
        items: [
            { label: "Sobre", href: "#acessibilidade" },
            {
                label: "Lei 14.129/2021",
                href: "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/L14129.htm",
                target: "_blank",
                rel: "noopener noreferrer",
            },
            { label: "GitHub", href: "https://github.com/Carloslgp/EasyRead", target: "_blank", rel: "noopener noreferrer" },
        ],
    },
];

const labelClass =
    "font-sans text-[11px] font-medium uppercase tracking-widest text-muted md:text-[10px]";

function Footer() {
    return (
        <footer id="sobre" className="px-4 pb-14">
            <div className="mx-auto md:max-w-[760px] lg:max-w-[1120px] xl:max-w-[1280px]">
                <div className="flex flex-col gap-10 border-t border-border pt-8 md:flex-row md:items-start md:justify-between">
                    <div className="max-w-[520px]">
                        <div className="mb-3 flex items-baseline gap-3">
                            <svg
                                aria-hidden="true"
                                width="18"
                                height="18"
                                viewBox="0 0 22 22"
                                className="translate-y-[2px]"
                            >
                                <rect
                                    x="0.5"
                                    y="0.5"
                                    width="21"
                                    height="21"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                    className="text-ink"
                                />
                                <line x1="5" y1="7" x2="17" y2="7" stroke="currentColor" strokeWidth="1" className="text-ink" />
                                <line x1="5" y1="11" x2="17" y2="11" stroke="currentColor" strokeWidth="1" className="text-ink" />
                                <line x1="5" y1="15" x2="13" y2="15" stroke="currentColor" strokeWidth="1.25" className="text-text_blue" />
                            </svg>
                            <span className="font-serif text-ink text-[16px] font-medium">
                                Leitura Fácil
                            </span>
                        </div>
                        <p className="font-sans text-[12px] leading-[1.7] text-muted">
                            Um projeto público de linguagem simples, desenvolvido em apoio à{" "}
                            <a
                                href="https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/L14129.htm"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-text_blue underline decoration-1 underline-offset-[3px] hover:text-button_blue"
                            >
                                Lei n.º 14.129/2021
                            </a>{" "}
                            — que institui princípios de governo digital e recomenda linguagem
                            acessível em comunicações do poder público. A ferramenta é gratuita,
                            sem cadastro, e não armazena os textos enviados.
                        </p>
                    </div>

                    <nav
                        aria-label="Links do rodapé"
                        className="grid grid-cols-3 gap-8 md:gap-10"
                    >
                        {columns.map(({ heading, items }) => (
                            <div key={heading}>
                                <h3 className={`mb-3 ${labelClass}`}>{heading}</h3>
                                <ul className="space-y-2 font-sans text-[12px] text-muted">
                                    {items.map((item) => (
                                        <li key={item.label}>
                                            <a
                                                href={item.href}
                                                target={item.target}
                                                rel={item.rel}
                                                className="transition-colors hover:text-ink"
                                            >
                                                {item.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </div>

                <div className="mt-10 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <span className="font-sans text-[11px] uppercase tracking-widest text-muted">
                        © 2026 · LEITURA FÁCIL
                    </span>
                    <span className="font-serif italic text-muted text-[13px]">
                        “A clareza é uma forma de cortesia.”
                    </span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
