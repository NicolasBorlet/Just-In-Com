import type { ServicesBlockProps } from "@/types";
import { AnimatedHeading, AnimatedParagraphLine } from "../animations/AnimatedText";
import RichText from "../globals/RichText";

export default function ServicesBlock({ block }: ServicesBlockProps) {
    return <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-8">
            {block.title && <AnimatedHeading level={2} className="text-4xl md:text-4xl text-center font-special">{block.title}</AnimatedHeading>}
            {block.description && <AnimatedParagraphLine className="text-lg text-center">{block.description}</AnimatedParagraphLine>}
        </div>
        {block.services && <div className="bg-[#F4E1E7] p-8 md:p-20 rounded-lg -rotate-1 md:-rotate-2">
            <div className="md:rotate-2 rotate-1">
            <RichText content={block.services} style="text-lg text-justify" specialH3={true} /></div>
        </div>}
    </div>;
}
