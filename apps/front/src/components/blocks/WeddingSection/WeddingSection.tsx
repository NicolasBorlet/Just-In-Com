import { useEffect } from "react";
import { WeddingSectionBlockProps } from "./WeddingSection.type";

export default function WeddingSection({ block }: WeddingSectionBlockProps) {
  useEffect(() => {
    console.log(block);
  }, [block]);

  return (
    <div>
      <img
        src={block.miniature?.url}
        alt="Wedding Miniature"
        className="w-full h-auto object-cover"
      />
    </div>
  );
}
