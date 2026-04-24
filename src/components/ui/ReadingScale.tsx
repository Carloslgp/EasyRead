type ReadingScaleProps = {
    gradeIndex: number;
    setGradeIndex: React.Dispatch<React.SetStateAction<number>>;
};

function ReadingScale({ gradeIndex, setGradeIndex } : ReadingScaleProps) {
    const grades = [
        "1.º ano",
        "2.º ano",
        "3.º ano",
        "4.º ano",
        "5.º ano",
        "6.º ano",
        "7.º ano",
        "8.º ano",
        "9.º ano",
        "Ensino médio",
        "Pós-Graduação",
        "Ensino Superior",
        "Mestrado",
        "Doutorado"
    ];

    const labels = ["Muito fácil", "Médio", "Complexo", "Jurídico"];

    return (
        <div>
            <div>
                <span>ESCALA DE LEITURA</span>
                <span style={{ float: "right" }}>
                    {grades[gradeIndex]}
                </span>
            </div>

            <input
                type="range"
                min={0}
                max={grades.length - 1}
                step={1}
                value={gradeIndex}
                onChange={(event) =>
                    setGradeIndex(Number(event.target.value))
                }
                style={{ width: "100%" }}
            />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                {labels.map((label) => (
                    <span key={label}>{label}</span>
                ))}
            </div>
        </div>
    );
}

export default ReadingScale;