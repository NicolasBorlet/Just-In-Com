"use client";

import { AnimatedHeading, AnimatedParagraph } from "@/animations";
import { AnimatedButton } from "@/animations/AnimatedButton";
import { ButtonAlignment, ButtonWidth } from "@/components/atoms/Button";
import { ContentSectionProps } from "./ContentSection.type";
import MediaBlock from "../MediaBlock/MediaBlock";
import { useRef, useState, useEffect, useCallback } from "react";
import { Media } from "@/types";

function HorizontalGallery({ images }: { images?: Media[] | null }) {
  const safeImages = Array.isArray(images) ? images : [];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  if (safeImages.length === 0) return null;

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative -mx-6 sm:-mx-12 md:-mx-24 lg:-mx-24 xl:-mx-[120px]">
      <div
        ref={scrollRef}
        className="flex gap-6 md:gap-12 overflow-x-auto snap-x snap-mandatory md:snap-none"
        style={{ scrollbarWidth: "none" }}
      >
        {safeImages.map((image) => (
          <div key={image.id} className="shrink-0 w-[85vw] md:w-[420px] snap-start">
            <MediaBlock
              block={{ media: image, __component: "elements.media", id: 0 }}
              alt={image.alternativeText || ""}
              enableHoverEffects={false}
              noRadius
              smallHeight
            />
          </div>
        ))}
      </div>

      {/* Arrows */}
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scroll("left")}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all cursor-pointer"
          aria-label="Précédent"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
      {canScrollRight && (
        <button
          type="button"
          onClick={() => scroll("right")}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all cursor-pointer"
          aria-label="Suivant"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default function ContentSection({ block }: ContentSectionProps) {
  return <div className="flex flex-col gap-8" key={block.id}>
    <div className="flex flex-col gap-4">
    <AnimatedHeading className="text-6xl md:text-8xl/tight text-center font-special" level={2} options={{
      splitType: 'words',
      animationType: 'slideUp',
      duration: 0.5,
      stagger: 0.05
    }}>{block.title}</AnimatedHeading>
    {block.description && <AnimatedParagraph className="text-lg md:text-2xl text-center max-w-3xl mx-auto" options={{
        splitType: 'words',
        animationType: 'slideUp',
        delay: 0.5,
        stagger: 0.01
    }}>{block.description}</AnimatedParagraph>}
    </div>
    {block.horizontal ? (
      <HorizontalGallery images={Array.isArray(block.gallerie) ? block.gallerie : null} />
    ) : (
      <div className={`grid gap-10 ${block.grid ? "grid-cols-2" : "grid-cols-1"}`}>
        {Array.isArray(block.gallerie) && block.gallerie.length > 0 && block.gallerie.map((image) => (
          <MediaBlock
            key={image.id}
            block={{ media: image, __component: "elements.media", id: 0 }}
            alt={image.alternativeText || ""}
            enableHoverEffects={false}
          />
        ))}
      </div>
    )}
    <AnimatedButton href={block.cta.href} isExternal={block.cta.isExternal} width={ButtonWidth.FIT} alignment={ButtonAlignment.CENTER} ariaLabel={block.cta.text}>{block.cta.text}</AnimatedButton>
  </div>;
}
