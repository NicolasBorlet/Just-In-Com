import { AnimatedHeading, AnimatedParagraphLine } from "@/animations/AnimatedText";
import RichText from "@/components/atoms/RichText";

import { ServicesBlock as ServicesBlockType } from "./ServicesBlock.type";

export default function ServicesBlock({ block }: { block: ServicesBlockType }) {
    return <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-8">
            {block.description && <AnimatedParagraphLine className="text-lg text-center">{block.description}</AnimatedParagraphLine>}
        </div>
        {block.Services && <div className="bg-[#F4E1E7] p-8 md:p-20 rounded-lg -rotate-1 md:-rotate-2">
            <div className="md:rotate-2 rotate-1">
                {block.title && <AnimatedHeading level={2} className="text-4xl md:rotate-2 rotate-1 md:text-4xl text-center font-special mb-5">{block.title}</AnimatedHeading>}
                <RichText content={block.Services} style="text-sm text-justify" specialH3={true} /></div>
        </div>}
    </div>;
}
