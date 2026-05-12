import jsPDF from "jspdf";

type ExportPdfParams = {
    result: string;
    register?: string;
    editorNote?: string;
};

function markdownToPlainText(md: string): string {
    return md
        .replace(/^#{1,6}\s+/gm, "")
        
        .replace(/\*\*(.+?)\*\*/g, "$1")
        
        .replace(/__(.+?)__/g, "$1")

        .replace(/\*(.+?)\*/g, "$1")

        .replace(/_(.+?)_/g, "$1")
        
        .replace(/^[\s]*[-*]\s+/gm, "• ")
        
        .replace(/^[\s]*(\d+)\.\s+/gm, "$1. ")
        
        .replace(/^>\s+/gm, "")
        
        .replace(/`(.+?)`/g, "$1")
        
        .replace(/\[(.+?)\]\(.+?\)/g, "$1")
        
        .replace(/\n{3,}/g, "\n\n")
        
        .trim();
}

export function exportPdf({ result, register, editorNote }: ExportPdfParams) {

    //Cria documento em formato A4, retrato
    const doc = new jsPDF({
        unit: "mm",
        format: "a4",
        orientation: "portrait",
    });

    // Configurações de layout
    const pageWidth = doc.internal.pageSize.getWidth();    
    const pageHeight = doc.internal.pageSize.getHeight();  
    const margin = 25;                                      //margem confortável
    const contentWidth = pageWidth - margin * 2;            // área útil
    const lineHeight = 7;                                   // espaçamento entre linhas
    
    let cursorY = margin;  //posição vertical atual no documento

    //Título
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("VERSÃO SIMPLIFICADA", margin, cursorY);
    cursorY += lineHeight * 1.5;

    //Nível de leitura
    if (register) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(`Nível de leitura: ${register}`, margin, cursorY);
        cursorY += lineHeight * 1.5;
    }

    // Linha separadora
    doc.setDrawColor(180);  // cinza claro
    doc.line(margin, cursorY, pageWidth - margin, cursorY);
    cursorY += lineHeight * 1.5;

    // Conteúdo principal
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(20);  // quase preto
    
    const cleanText = markdownToPlainText(result);
    
    // Quebra o texto em linhas que cabem na largura da página
    const lines = doc.splitTextToSize(cleanText, contentWidth);
    
    for (const line of lines) {
        // Se chegou no fim da página, cria nova página
        if (cursorY > pageHeight - margin) {
            doc.addPage();
            cursorY = margin;
        }
        
        doc.text(line, margin, cursorY);
        cursorY += lineHeight;
    }

    //bservação do editor (se houver)
    if (editorNote) {
        cursorY += lineHeight;  // espaço extra
        
        //Se não cabe na página atual, vai pra próxima
        if (cursorY > pageHeight - margin - 30) {
            doc.addPage();
            cursorY = margin;
        }
        
        doc.setDrawColor(180);
        doc.line(margin, cursorY, pageWidth - margin, cursorY);
        cursorY += lineHeight;
        
        doc.setFont("helvetica", "italic");
        doc.setFontSize(10);
        doc.setTextColor(100);
        
        const noteLines = doc.splitTextToSize(markdownToPlainText(editorNote), contentWidth);
        for (const line of noteLines) {
            if (cursorY > pageHeight - margin) {
                doc.addPage();
                cursorY = margin;
            }
            doc.text(line, margin, cursorY);
            cursorY += lineHeight;
        }
    }

    //Download
    doc.save("texto-simplificado.pdf");
}