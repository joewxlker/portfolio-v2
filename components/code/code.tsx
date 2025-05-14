import CodeViewer from "./viewer";

export const Code = ({ content, language }: { content: string, language: string }) => {
    return (<CodeViewer content={content} language={language} />)
}