type ReadingScaleProps = {
    gradeIndex: number;
    setGradeIndex: React.Dispatch<React.SetStateAction<number>>;
};

function ReadingScale({ gradeIndex, setGradeIndex }: ReadingScaleProps) {
    const grades = [
        "1.º ano", "2.º ano", "3.º ano", "4.º ano", "5.º ano",
        "6.º ano", "7.º ano", "8.º ano", "9.º ano",
        "Médio", "Superior", "Mestrado", "Doutorado"
    ];

    const labels = ["MUITO FÁCIL", "MÉDIO", "COMPLEXO", "JURÍDICO"];

    const getCategory = (index: number) => {
        if (index <= 3) return "FÁCIL";
        if (index <= 8) return "MÉDIO";
        if (index <= 10) return "COMPLEXO";
        return "JURÍDICO";
    };

    const percentage = (gradeIndex / (grades.length - 1)) * 100;

    return (
        <div className="rounded-lg p-6 bg-paper">
            <div className="flex justify-between items-center mb-4">
                <span className="text-[11px] tracking-[0.2em] text-muted font-sans">
                    ESCALA DE LEITURA
                </span>
                <span className="text-[11px] tracking-[0.15em] text-ink font-sans">
                    {grades[gradeIndex].toUpperCase()}
                    <span className="mx-2 text-muted">·</span>
                    {getCategory(gradeIndex)}
                </span>
            </div>

            <div className="relative mb-3">
                <input
                    type="range"
                    min={0}
                    max={grades.length - 1}
                    step={1}
                    value={gradeIndex}
                    onChange={(event) => setGradeIndex(Number(event.target.value))}
                    className="reading-scale-slider w-full"
                    style={{
                        background: `linear-gradient(to right, #223e68 0%, #223e68 ${percentage}%, #f0e9d8 ${percentage}%, #f0e9d8 100%)`,
                    }}
                />
            </div>

            <div className="flex justify-between text-[10px] tracking-[0.15em] text-muted font-sans">
                {labels.map((label) => (
                    <span key={label}>{label}</span>
                ))}
            </div>

            <style>{`
                .reading-scale-slider {
                    -webkit-appearance: none;
                    appearance: none;
                    height: 6px;
                    border-radius: 3px;
                    outline: none;
                    cursor: pointer;
                }

                .reading-scale-slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: #223e68;
                    border: 3px solid #ffffff;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
                    cursor: pointer;
                    transition: transform 0.15s ease;
                }

                .reading-scale-slider::-webkit-slider-thumb:hover {
                    transform: scale(1.1);
                }

                .reading-scale-slider::-moz-range-thumb {
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: #223e68;
                    border: 3px solid #ffffff;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
                    cursor: pointer;
                    transition: transform 0.15s ease;
                }

                .reading-scale-slider::-moz-range-thumb:hover {
                    transform: scale(1.1);
                }
            `}</style>
        </div>
    );
}

export default ReadingScale;