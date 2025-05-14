"use client"

import React, { useRef, useEffect, useState } from "react";
import Prism from "prismjs";

import "prismjs/components/prism-rust";
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-toml';
import 'prismjs/components/prism-yaml';
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-json";
import 'prismjs/components/prism-tsx';
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/themes/prism-okaidia.css";

export default function CodeViewer({ content, language }: { content: string, language: string }) {
  const [lang, setLang] = useState("plain");
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [content, language]);

  useEffect(() => 
    // prevents hydration errors
    setLang(language), [language]);

  return (
    <pre className="line-numbers h-full w-full !bg-transparent">
      <code ref={codeRef} className={`language-${lang} !bg-transparent`}>
        {content}
      </code>
    </pre>
  );
}