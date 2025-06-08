import { QuoteBlock as QuoteBlockType } from "@/types";
import RichText from "../globals/RichText";

export default function QuoteBlock({ block }: { block: QuoteBlockType }) {
  return (
    <div className="flex items-center justify-center">
        <RichText content={block.content} />
    </div>
  );
}
