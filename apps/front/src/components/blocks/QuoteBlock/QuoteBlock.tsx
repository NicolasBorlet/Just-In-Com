import RichText from "@/components/atoms/RichText";
import { QuoteBlock as QuoteBlockType } from "./QuoteBlock.type";

export default function QuoteBlock({ block }: { block: QuoteBlockType }) {
  return (
    <div className="flex items-center justify-center quote-block py-8 md:py-12 px-4">
      <RichText
        content={block.content}
        style="text-center text-4xl md:text-6xl lg:text-7xl leading-tight font-special"
      />
    </div>
  );
}
