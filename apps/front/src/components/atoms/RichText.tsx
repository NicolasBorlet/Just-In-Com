'use client';

import React from 'react';
import { AnimatedHeading, AnimatedParagraph } from '@/animations';

interface MarkdownElement {
  type: 'h1' | 'h2' | 'h3' | 'p' | 'ul' | 'li' | 'strong' | 'em' | 'a' | 'img';
  content: string;
  level?: number;
  href?: string;
  src?: string;
  children?: MarkdownElement[];
}

function parseMarkdownToElements(markdown: string): MarkdownElement[] {
  const lines = markdown.split('\n').filter(line => line.trim() !== '');
  const elements: MarkdownElement[] = [];
  let currentList: MarkdownElement | null = null;

  for (const line of lines) {
    const trimmedLine = line.trim();

    // Headers
    if (trimmedLine.startsWith('### ')) {
      currentList = null; // Reset list context
      elements.push({
        type: 'h3',
        level: 3,
        content: trimmedLine.substring(4)
      });
    } else if (trimmedLine.startsWith('## ')) {
      currentList = null; // Reset list context
      elements.push({
        type: 'h2',
        level: 2,
        content: trimmedLine.substring(3)
      });
    } else if (trimmedLine.startsWith('# ')) {
      currentList = null; // Reset list context
      elements.push({
        type: 'h1',
        level: 1,
        content: trimmedLine.substring(2)
      });
    }
    // List items
    else if (trimmedLine.match(/^\s*[\*\-]\s/)) {
      const listItemContent = trimmedLine.replace(/^\s*[\*\-]\s/, '');

      if (!currentList) {
        currentList = {
          type: 'ul',
          content: '',
          children: []
        };
        elements.push(currentList);
      }

      currentList.children!.push({
        type: 'li',
        content: listItemContent
      });
    }
    // Markdown images: ![alt](url)
    else if (trimmedLine.match(/^!\[.*?\]\(.*?\)$/)) {
      currentList = null;
      const match = trimmedLine.match(/^!\[(.*?)\]\((.*?)\)$/);
      if (match) {
        elements.push({
          type: 'img',
          content: match[1],
          src: match[2]
        });
      }
    }
    // HTML img tags: <img src="..." alt="..." />
    else if (trimmedLine.match(/^<img\s/i)) {
      currentList = null;
      const srcMatch = trimmedLine.match(/src=["'](.*?)["']/i);
      const altMatch = trimmedLine.match(/alt=["'](.*?)["']/i);
      if (srcMatch) {
        elements.push({
          type: 'img',
          content: altMatch?.[1] || '',
          src: srcMatch[1]
        });
      }
    }
    // Bare image URLs on their own line
    else if (trimmedLine.match(/^https?:\/\/.*\.(jpg|jpeg|png|gif|webp|svg|avif)(\?.*)?$/i)) {
      currentList = null;
      elements.push({
        type: 'img',
        content: '',
        src: trimmedLine
      });
    }
    // Markdown link wrapping an image URL: [filename](url)
    else if (trimmedLine.match(/^\[.*?\]\(https?:\/\/.*\.(jpg|jpeg|png|gif|webp|svg|avif)(\?.*)?.*\)$/i)) {
      currentList = null;
      const match = trimmedLine.match(/^\[(.*?)\]\((.*?)\)$/);
      if (match) {
        elements.push({
          type: 'img',
          content: match[1],
          src: match[2]
        });
      }
    }
    // Paragraphs
    else {
      currentList = null; // Reset list context
      elements.push({
        type: 'p',
        content: trimmedLine
      });
    }
  }

  return elements;
}

function processInlineMarkdown(text: string): React.ReactNode {
  // Handle bold, italic, links, inline images, and bare image URLs
  const parts = text.split(/(!\[.*?\]\(.*?\)|\*\*.*?\*\*|\*.*?\*|\[.*?\]\(.*?\)|https?:\/\/\S+\.(?:jpg|jpeg|png|gif|webp|svg|avif)(?:\?\S*)?)/gi);

  return parts.map((part, index) => {
    if (part.startsWith('![')) {
      const match = part.match(/!\[(.*?)\]\((.*?)\)/);
      if (match) {
        return <img key={index} src={match[2]} alt={match[1]} className="inline-block max-w-full h-auto rounded-lg my-2" />;
      }
    } else if (part.match(/^https?:\/\/\S+\.(?:jpg|jpeg|png|gif|webp|svg|avif)(?:\?\S*)?$/i)) {
      return <img key={index} src={part} alt="" className="inline-block max-w-full h-auto rounded-lg my-2" />;
    } else if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    } else if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    } else if (part.match(/\[.*?\]\(.*?\)/)) {
      const match = part.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        const isImage = /\.(jpg|jpeg|png|gif|webp|svg|avif)(\?.*)?$/i.test(match[2]);
        if (isImage) {
          return <img key={index} src={match[2]} alt={match[1]} className="block max-w-full h-auto rounded-lg my-2" />;
        }
        return <a key={index} href={match[2]} className="text-blue-600 hover:text-blue-800 underline">{match[1]}</a>;
      }
    }
    return part;
  });
}

function RenderElement({ element, index, specialH3 }: { element: MarkdownElement; index: number; specialH3: boolean }) {
  const animationDelay = index * 0.03;

  switch (element.type) {
    case 'h1':
      return (
        <AnimatedHeading
          key={index}
          level={1}
          className="text-3xl md:text-4xl font-bold mb-4 mt-6"
          options={{
            splitType: 'words',
            animationType: 'slideUp',
            delay: animationDelay,
            stagger: 0.05
          }}
        >
          {processInlineMarkdown(element.content)}
        </AnimatedHeading>
      );

    case 'h2':
      return (
        <AnimatedHeading
          key={index}
          level={2}
          className="text-2xl md:text-3xl font-bold mb-3 mt-5"
          options={{
            splitType: 'words',
            animationType: 'slideUp',
            delay: animationDelay,
            stagger: 0.05
          }}
        >
          {processInlineMarkdown(element.content)}
        </AnimatedHeading>
      );

    case 'h3':
      return (
        <AnimatedHeading
          key={index}
          level={3}
          className={`text-xl md:text-2xl font-bold mb-2 mt-4${specialH3 ? ' font-special' : ''}`}
          options={{
            splitType: 'words',
            animationType: 'slideUp',
            delay: animationDelay,
            stagger: 0.02
          }}
        >
          {processInlineMarkdown(element.content)}
        </AnimatedHeading>
      );

    case 'p':
      return (
        <AnimatedParagraph
          key={index}
          className="text-md md:text-lg mb-4"
          options={{
            splitType: 'words',
            animationType: 'slideUp',
            delay: animationDelay,
            stagger: 0.01
          }}
        >
          {processInlineMarkdown(element.content)}
        </AnimatedParagraph>
      );

    case 'ul':
      return (
        <ul key={index} className="list-disc list-inside mb-4 space-y-2">
          {element.children?.map((child, childIndex) => (
            <AnimatedParagraph
              key={childIndex}
              className="text-md md:text-lg"
              options={{
                splitType: 'words',
                animationType: 'slideUp',
                delay: animationDelay + (childIndex * 0.05),
                stagger: 0.02
              }}
            >
              <li>{processInlineMarkdown(child.content)}</li>
            </AnimatedParagraph>
          ))}
        </ul>
      );

    case 'img':
      return (
        <img
          key={index}
          src={element.src}
          alt={element.content}
          className="w-full h-auto rounded-lg my-4"
        />
      );

    default:
      return null;
  }
}

export default function RichText({ content, style, specialH3 = false }: { content: string, style?: string, specialH3?: boolean }) {
  const elements = parseMarkdownToElements(content);

  return (
    <div className={`prose max-w-none ${style || ''}`}>
      {elements.map((element, index) => (
        <RenderElement key={index} element={element} index={index} specialH3={specialH3} />
      ))}
    </div>
  );
}
