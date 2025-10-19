import { WeddingSectionBlockProps } from "./WeddingSection.type";

export default function WeddingSection({ block }: WeddingSectionBlockProps) {
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
