import type { TextBlockProps } from "@/types";

export default function TextBlock({ block }: TextBlockProps) {
    return <div className="flex flex-col gap-4">
        {block.title && <h2 className="text-2xl font-bold">{block.title}</h2>}
        {block.content && <p className="text-lg text-justify">{block.content}</p>}
    </div>;
}
