function parseMarkdown(markdown: string): string {
  // Replace headers
  let html = markdown
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>');

  // Replace bold and italic
  html = html
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Replace links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Replace lists
  html = html
    .replace(/^\s*[\*\-]\s(.*$)/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>');

  // Replace paragraphs
  html = html.replace(/^(?!<[h|u|li])(.*$)/gm, '<p>$1</p>');

  // Clean up empty paragraphs and fix nested lists
  html = html
    .replace(/<p><\/p>/g, '')
    .replace(/<\/ul>\s*<ul>/g, '');

  return html;
}

export default function RichText({ content }: { content: string }) {
  const parsedContent = parseMarkdown(content);
  return <div className="prose" dangerouslySetInnerHTML={{ __html: parsedContent }} />;
}
