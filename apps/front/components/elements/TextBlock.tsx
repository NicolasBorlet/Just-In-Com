import type { TextBlockProps } from "@/types";
import { AnimatedHeading, AnimatedParagraphLine } from "../animations/AnimatedText";

export default function TextBlock({ block }: TextBlockProps) {
    return <div className="flex flex-col gap-4">
        {block.title && <AnimatedHeading level={2} className="text-2xl font-bold">{block.title}</AnimatedHeading>}
        {block.content && <AnimatedParagraphLine className="text-lg text-justify">{block.content}</AnimatedParagraphLine>}
    </div>;
}
