

type InfoBadgeProps = {
  valor?: number;
  label: string;
};

function Paragraph({ valor, label} : InfoBadgeProps){
    const hasValor = valor !== undefined;

    return (
        <div>
            {hasValor && <span>{valor + " "}</span>}
            <span>{hasValor && valor > 1 ? `${label}S` : label}</span>
        </div>

    )
}

export default Paragraph
