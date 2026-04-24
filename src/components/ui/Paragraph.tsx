

type InfoBadgeProps = {
  valor?: number;
  label: string;
};

function Paragraph({ valor, label} : InfoBadgeProps){
    const hasValor = valor !== undefined;

    return (
        <div>
            {hasValor && <span className="pt-3 pb-1 font-sans text-[12px] md:text-xs font-medium text-muted tracking-widest">{valor + " "}</span>}
            <span className="font-sans md:text-[12px] text-[11px] md:text-xs font-medium text-muted tracking-widest">{hasValor && valor > 1 ? `${label}S` : label}</span>
        </div>

    )
}

export default Paragraph
