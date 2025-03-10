'use client'
import DOMPurify from "isomorphic-dompurify";
import { useEffect, useState } from "react";

type Props = {
  content: string
  className?: string
};

export function SanitizedContent({ content, className }: Props) {
  const [cleanHtml, setCleanHtml] = useState<string>('')
  useEffect(() => {
    setCleanHtml(DOMPurify.sanitize(content))
  }, [content]);

  return (
    <div className={ className } dangerouslySetInnerHTML={ { __html: cleanHtml } }></div>
  );
}