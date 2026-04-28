type ButtonProps = {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
};

function Button({ label, onClick, disabled }: ButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className="font-sans text-[10px] font-medium uppercase tracking-widest text-muted transition-colors duration-200 hover:text-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-button_blue focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:opacity-50 disabled:cursor-not-allowed md:text-[8px] lg:text-[10px]"
            >
            {label}
        </button>
    );
}

export default Button;