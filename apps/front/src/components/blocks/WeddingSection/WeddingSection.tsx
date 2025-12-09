import { useEffect } from "react";
import { WeddingSectionBlockProps } from "./WeddingSection.type";
import { getFullUrl } from "@/utils/get-strapi-url";

export default function WeddingSection({ block }: WeddingSectionBlockProps) {
  useEffect(() => {
    console.log(block);
  }, [block]);

  return (
    <div>
      <img
        src={getFullUrl(block.miniature.url)}
        alt="Wedding Miniature"
        className="w-full h-auto object-cover"
      />
    </div>
  );
}
