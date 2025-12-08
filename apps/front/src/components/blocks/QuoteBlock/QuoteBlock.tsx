import RichText from "@/components/atoms/RichText";
import { QuoteBlock as QuoteBlockType } from "./QuoteBlock.type";

export default function QuoteBlock({ block }: { block: QuoteBlockType }) {
  return (
    <div className="flex items-center justify-center quote-block">
        <RichText content={block.content} style="text-center text-4xl" />
    </div>
  );
}
