"use client";

import { WeddingSectionBlock } from "@/components/blocks/WeddingSection/WeddingSection.type";
import VideoWithSound from "@/components/atoms/VideoWithSound";
import { getFullUrl } from "@/utils/get-strapi-url";
import Image from "next/image";
import Link from "next/link";

function isDirectVideo(url: string) {
  return /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url);
}

export default function HomeWeddingVideos({
  blocks,
  title,
}: {
  blocks: WeddingSectionBlock[];
  title?: string;
}) {
  if (!blocks?.length) return null;

  return (
    <section className="flex flex-col gap-8">
      {title && <h2 className="text-4xl md:text-6xl text-center font-special">{title}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blocks.map((block) => {
          const names = block.married.map((p) => p.name).join(" & ");
          const link = block.link;
          const thumbnail = getFullUrl(block.miniature.url);

          if (link && isDirectVideo(link)) {
            return (
              <div key={block.id} className="relative rounded-lg overflow-hidden aspect-[3/4]">
                <VideoWithSound src={link} compact className="absolute inset-0 h-full" />
                <p className="absolute bottom-3 left-3 text-white font-special text-xl drop-shadow">
                  {names}
                </p>
              </div>
            );
          }

          return (
            <Link
              key={block.id}
              href={link || "#"}
              target={link ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group relative rounded-lg overflow-hidden aspect-[3/4]"
            >
              <Image
                src={thumbnail}
                alt={names}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors flex items-end p-4">
                <span className="text-white font-special text-xl">{names}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
