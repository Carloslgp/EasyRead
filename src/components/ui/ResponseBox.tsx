import ReactMarkdown from 'react-markdown';

type ResponseBoxProps = {
    content?: string
    loading?: boolean
    error?: string
};

function ResponseBox({ content, loading, error }: ResponseBoxProps) {

   return (
        <div 
            aria-live="polite"
            aria-busy={loading}
            aria-label="Versão simplificada do texto"
        >
            {loading && (
                <div className="flex items-center justify-center h-full text-muted italic font-sans text-sm">
                    Simplificando texto...
                </div>
            )}

            {!loading && error && (
                <div className="text-red-700 font-sans text-sm" role="alert">
                    {error}
                </div>
            )}

            {!loading && !error && !content && (
                <div className="flex items-center justify-center h-full text-muted italic font-sans text-sm">
                    A versão simplificada aparecerá aqui.
                </div>
            )}

            {!loading && !error && content && (
                <div className="space-y-4 [&>p]:leading-8 [&_strong]:font-semibold [&_strong]:text-ink [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5">
                    <ReactMarkdown>{content}</ReactMarkdown>
                </div>
            )}
        </div>
   )

}

export default ResponseBox;