type InfoBadgeProps = {
  valor?: number;
  label: string;
};

function Paragraph({ valor, label }: InfoBadgeProps) {
    const hasValor = valor !== undefined;
    const labelClassName = "font-sans text-[11px] md:text-[8px] lg:text-[10px] font-medium uppercase leading-relaxed tracking-widest text-muted";
    const displayLabel = hasValor && valor > 1
        ? label.replace(/^(\S+)/, (firstWord) => firstWord.endsWith("S") ? firstWord : `${firstWord}S`)
        : label;

    const accessibleText = hasValor
        ? `${valor} ${displayLabel.toLowerCase()}`
        : displayLabel.toLowerCase();

    return (
        <div role="text" aria-label={accessibleText}>
            <span className="sr-only">{accessibleText}</span>
            {hasValor && (
                <span aria-hidden="true" className={labelClassName}>
                    {valor + " "}
                </span>
            )}
            <span aria-hidden="true" className={labelClassName}>
                {displayLabel.toLowerCase()}
            </span>
        </div>
    );
}

export default Paragraph;
