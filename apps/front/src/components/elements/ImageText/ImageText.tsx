import { getFullUrl } from "@/utils/get-strapi-url";
import ImageTextType from "./ImageText.type";

export default function ImageText({ block }: { block: ImageTextType }) {
    return (
        <div>
            <h2>{block.text.title}</h2>
            <p>{block.text.content}</p>
            <img src={getFullUrl(block.image.url)} alt={block.text.title} />
        </div>
    );
}