import { QuoteBlock as QuoteBlockType } from "@/types";
import RichText from "../globals/RichText";

export default function QuoteBlock({ block }: { block: QuoteBlockType }) {
  return (
    <div className="flex items-center justify-center quote-block">
        <RichText content={block.content} style="text-center text-4xl" />
    </div>
  );
}
