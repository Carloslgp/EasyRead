type InfoBadgeProps = {
  label: string;
};


function Button({label} : InfoBadgeProps){

    return (
        <button
            type="button"
            className="font-sans text-[10px] font-medium uppercase tracking-widest text-muted transition-colors duration-200 hover:text-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-button_blue focus-visible:ring-offset-2 focus-visible:ring-offset-paper md:text-[8px] lg:text-[10px]"
        >
            {label}
        </button>

    )
}

export default Button
