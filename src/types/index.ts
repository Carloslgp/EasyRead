export type SimplifyResponse = {
    result: string;
    documentType: string;
    register: string;
    editorNote: string;
};

export type ExtractResponse = {
    text: string;
    source: "pdf-native" | "pdf-vision" | "image" | "url";
    pages?: number;
    truncated?: boolean;
};


