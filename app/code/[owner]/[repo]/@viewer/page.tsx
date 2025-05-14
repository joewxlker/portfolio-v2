import { Code } from "@/components/code/code";
import { loadCodeFile } from "@/lib/github";

interface ViewerPageProps {  
    searchParams: Promise<{ url?: string, lang?: string }>;
}

export default async function ViewerPage({ searchParams }: ViewerPageProps) {
    const { lang, url } = await searchParams;
    
    if (url && lang) {
        const code = await loadCodeFile(url);
        return (<Code content={code} language={lang}/>);
    }

    return (<Code content={ "// Select a file to view code"} language={"plaintext"}/>)
}