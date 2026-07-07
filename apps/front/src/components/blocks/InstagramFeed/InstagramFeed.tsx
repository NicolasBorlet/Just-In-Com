"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface InstagramPost {
  id: string;
  media_url: string;
  permalink: string;
}

// Placeholder posts until Instagram API is connected
const placeholderPosts: InstagramPost[] = Array.from({ length: 10 }, (_, i) => ({
  id: `placeholder-${i}`,
  media_url: `https://picsum.photos/seed/insta${i}/240/240`,
  permalink: "https://www.instagram.com/justinfilm_/",
}));

export default function InstagramFeed() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const posts = placeholderPosts;

  // Duplicate posts for infinite scroll illusion
  const duplicatedPosts = [...posts, ...posts];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationId: number;
    let scrollPos = 0;
    const speed = 0.5;

    const animate = () => {
      scrollPos += speed;
      // Reset when first set is fully scrolled
      const halfWidth = container.scrollWidth / 2;
      if (scrollPos >= halfWidth) {
        scrollPos = 0;
      }
      container.scrollLeft = scrollPos;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    const onEnter = () => cancelAnimationFrame(animationId);
    const onLeave = () => {
      animationId = requestAnimationFrame(animate);
    };

    container.addEventListener("mouseenter", onEnter);
    container.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener("mouseenter", onEnter);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Scrolling feed */}
      <div
        ref={scrollRef}
        className="flex gap-8 overflow-hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {duplicatedPosts.map((post, i) => (
          <a
            key={`${post.id}-${i}`}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
          >
            <Image
              src={post.media_url}
              alt="Instagram post"
              width={240}
              height={240}
              className="w-[180px] h-[180px] md:w-[240px] md:h-[240px] object-cover"
            />
          </a>
        ))}
      </div>

      {/* Centered handle overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <a
          href="https://www.instagram.com/justinfilm_/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white px-3 py-1.5 md:px-5 md:py-2.5 text-[16px] md:text-[28px] font-normal pointer-events-auto hover:opacity-90 transition-opacity text-[#A33E5E] rounded-[12px]"
          style={{ fontFamily: "var(--font-baloo)" }}
        >
          @justinfilm_
        </a>
      </div>
    </div>
  );
}
