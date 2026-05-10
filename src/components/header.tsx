import { useState } from "react";

const navItems = [
    { label: "Princípios", href: "#principios" },
    { label: "GitHub", href: "https://github.com/Carloslgp/EasyRead", target: "_blank", rel: "noopener noreferrer" },
];

function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className="px-4 pt-6 sm:pt-8">
            <div className="mx-auto md:max-w-[760px] lg:max-w-[1120px] xl:max-w-[1280px]">
            <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-border gap-4">

                <div className="flex items-baseline gap-3 sm:gap-4 min-w-0">
                    <svg aria-hidden="true"
                        className="w-6 h-5 text-ink shrink-0 self-center"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="square"
                    >
                        <rect x="2" y="2" width="20" height="20" rx="1" />
                        <line x1="6" y1="8" x2="18" y2="8" />
                        <line x1="6" y1="13" x2="18" y2="13" />
                        <line x1="6" y1="18" x2="16" y2="18" />
                    </svg>

                    <h1 className="text-ink text-lg sm:text-xl font-serif font-semibold whitespace-nowrap">
                        Leitura Fácil
                    </h1>

                    <span className="hidden sm:inline font-sans text-[10px] md:text-xs font-medium text-muted tracking-widest uppercase whitespace-nowrap">
                        Acessibilidade Cognitiva
                    </span>
                </div>

                <nav className="hidden lg:block" aria-label="Navegação principal">
                    <ul className="flex items-center gap-8 font-sans text-sm text-muted">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <a
                                    href={item.href}
                                    target={item.target}
                                    rel={item.rel}
                                    className="hover:text-ink transition-colors"
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <button
                    type="button"
                    aria-label={open ? "Fechar menu" : "Abrir menu"}
                    aria-expanded={open}
                    aria-controls="mobile-nav"
                    onClick={() => setOpen((v) => !v)}
                    className="lg:hidden text-ink p-2"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    >
                        {open ? (
                            <>
                                <line x1="6" y1="6" x2="18" y2="18" />
                                <line x1="18" y1="6" x2="6" y2="18" />
                            </>
                        ) : (
                            <>
                                <line x1="4" y1="7" x2="20" y2="7" />
                                <line x1="4" y1="12" x2="20" y2="12" />
                                <line x1="4" y1="17" x2="20" y2="17" />
                            </>
                        )}
                    </svg>
                </button>
            </div>

            <nav
                id="mobile-nav"
                aria-label="Menu de navegação móvel"
                aria-hidden={!open}
                className={`lg:hidden overflow-hidden transition-[max-height] duration-300 ${
                    open ? "max-h-96" : "max-h-0"
                }`}
            >
                <ul className="flex flex-col py-2 font-sans text-sm text-muted">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <a
                                href={item.href}
                                target={item.target}
                                rel={item.rel}
                                onClick={() => setOpen(false)}
                                className="block py-3 hover:text-ink transition-colors"
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            </div>
        </header>
    );
}

export default Header;
