'use client';

import { GallerieSection as GallerieSectionType } from "@/types";
import { useState } from "react";
import { AnimatedButton } from "../animations/AnimatedButton";
import { AnimatedHeading, AnimatedParagraph } from "../animations/AnimatedText";
import MediaBlock from "../elements/Media";
import { ButtonAlignment, ButtonWidth } from "../globals/Button";
import ImagePopup from "../globals/ImagePopup";

export default function GalerySection({ block }: { block: GallerieSectionType }) {
  const [selectedImage, setSelectedImage] = useState<{ url: string; alt: string; title?: string } | null>(null);

  const handleImageClick = (image: any) => {
    setSelectedImage({
      url: image.url,
      alt: image.alternativeText || "",
      title: image.caption || ""
    });
  };

  const closePopup = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <ImagePopup
        isOpen={!!selectedImage}
        onClose={closePopup}
        imageUrl={selectedImage?.url || ""}
        alt={selectedImage?.alt || ""}
        title={selectedImage?.title}
      />

      <div className="flex flex-col gap-12" key={block.id}>
        <div className="flex flex-col gap-4">
          <AnimatedHeading level={2} className="text-4xl md:text-4xl text-center font-special">{block.title}</AnimatedHeading>
          {block.description && <AnimatedParagraph className="text-lg md:text-xl text-center max-w-3xl mx-auto" options={{ delay: 0.2, duration: 0.4 }}>{block.description}</AnimatedParagraph>}
        </div>
        <div className={`grid-cols-1 gap-10 grid`}>
          {block.galery.map((image) => (
            <MediaBlock
              key={image.id}
              block={{ media: image, __component: "elements.media", id: 0 }}
              alt={image.alternativeText || ""}
              width={800}
              height={800}
              enableHoverEffects={true}
              onClick={() => handleImageClick(image)}
            />
          ))}
        </div>
        <AnimatedButton href={block.cta.href} isExternal={block.cta.isExternal} width={ButtonWidth.FIT} alignment={ButtonAlignment.CENTER} ariaLabel={block.cta.text}>{block.cta.text}</AnimatedButton>
      </div>
    </>
  );
}
