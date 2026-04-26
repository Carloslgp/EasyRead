export type SimplifyRequest = {
    text: string
    grade: string
}

export type SimplifyResponse = {
    result: string
    documentType: string
    register: string
    editorNote: string
}