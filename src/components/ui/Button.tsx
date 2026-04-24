type InfoBadgeProps = {
  label: string;
};


function Button({label} : InfoBadgeProps){

    return (
        <div>
            <span className="font-sans md:text-[12px] text-[10px] md:text-xs font-medium text-muted tracking-widest">{label}</span>
        </div>

    )
}

export default Button