import { JSX } from "react";
import TextBlockType from "./TextBlock.type";

export default function TextBlock({ block, tag = 'h2' }: { block: TextBlockType, tag?: keyof JSX.IntrinsicElements }) {
    const Tag = tag;
    return (
        <div>
            <Tag>{block.title}</Tag>
            <p>{block.content}</p>
        </div>
    );
}