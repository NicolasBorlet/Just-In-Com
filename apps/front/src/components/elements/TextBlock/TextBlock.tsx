import { JSX } from "react";
import TextBlockType from "./TextBlock.type";
import { AnimatedText, AnimatedParagraph } from "@/animations";

export default function TextBlock({ block }: { block: TextBlockType }) {
    return (
        <div className="gap-12 flex flex-col">
            <AnimatedText className="font-special text-[36px] font-medium">{block.title}</AnimatedText>
            <AnimatedParagraph className="text-xl">{block.content}</AnimatedParagraph>
        </div>
    );
}