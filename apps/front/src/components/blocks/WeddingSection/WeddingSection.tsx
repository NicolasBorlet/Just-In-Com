import Image from "next/image";
import { WeddingSectionBlockProps } from "./WeddingSection.type";
import { getFullUrl } from "@/utils/get-strapi-url";

export default function WeddingSection({ block }: WeddingSectionBlockProps) {
  return (
    <div>
      <Image
        src={getFullUrl(block.miniature.url)}
        alt="Wedding Miniature"
        className="w-full h-auto object-cover"
        width={1200}
        height={600}
      />
    </div>
  );
}
