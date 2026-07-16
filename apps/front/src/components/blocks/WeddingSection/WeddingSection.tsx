"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import { WeddingSectionBlockProps } from "./WeddingSection.type";
import { getFullUrl } from "@/utils/get-strapi-url";

export default function WeddingSection({
  block,
  compact = false,
}: WeddingSectionBlockProps & { compact?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  const marriedNames = block.married.map((p) => p.name);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`group relative w-full overflow-hidden rounded-2xl cursor-pointer ${compact ? "max-w-md mx-auto" : ""}`}
      >
        <Image
          src={getFullUrl(block.miniature.url)}
          alt={marriedNames.join(" ")}
          className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${compact ? "h-auto max-h-[320px]" : "h-auto"}`}
          width={compact ? 800 : 1200}
          height={compact ? 450 : 600}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
          <span className={`text-white font-special opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0 flex flex-col items-center gap-1 ${compact ? "text-xl md:text-2xl" : "text-2xl md:text-4xl"}`}>
            {marriedNames.map((name, i) => (
              <span key={i}>{name}</span>
            ))}
          </span>
        </div>
      </button>

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={close}
        />

        <div
          className={`relative bg-white rounded-2xl max-w-lg w-[90%] overflow-hidden shadow-2xl transition-all duration-300 ${
            isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-8"
          }`}
        >
          <button
            type="button"
            onClick={close}
            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          <div className="relative h-56">
            <Image
              src={getFullUrl(block.miniature.url)}
              alt={marriedNames.join(" ")}
              className="w-full h-full object-cover"
              width={800}
              height={400}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <Link
              href={block.link}
              className="absolute inset-0 flex items-center justify-center group/play"
              target="_blank"
              aria-label="Play video"
            >
              <span className="w-16 h-16 flex items-center justify-center rounded-full bg-white/80 group-hover/play:bg-white group-hover/play:scale-110 transition-all duration-300 shadow-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M8 5.14v13.72a1 1 0 001.5.86l11.04-6.86a1 1 0 000-1.72L9.5 4.28a1 1 0 00-1.5.86z" fill="currentColor" className="text-gray-800" />
                </svg>
              </span>
            </Link>
            <h3 className="absolute bottom-4 left-6 text-white text-3xl font-special flex flex-col gap-0.5 pointer-events-none">
              {marriedNames.map((name, i) => (
                <span key={i}>{name}</span>
              ))}
            </h3>
          </div>

          <div className="p-6 space-y-4">
            <div
              className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{
                __html: block.description
                  .replace(/### (.+)/g, '<h3 class="text-lg font-bold mt-3 mb-1">$1</h3>')
                  .replace(/## (.+)/g, '<h2 class="text-xl font-bold mt-4 mb-2">$1</h2>')
                  .replace(/# (.+)/g, '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>')
                  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\*(.+?)\*/g, '<em>$1</em>')
                  .replace(/\n/g, '<br />')
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
