

type InfoBadgeProps = {
  valor: number;
  label: string;
};

function Paragraph({ valor, label} : InfoBadgeProps){
    return (
        <div>
            <span>{valor + " "}</span>
            <span>{valor > 1 ? `${label}S` : label}</span>
        </div>

    )
}

export default Paragraph
