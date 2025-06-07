import type { ImageBlock } from "@/types";
import { getStrapiURL } from "@/utils/get-strapi-url";
import Image from "next/image";

export default function ImageBlock({ block }: { block: ImageBlock }) {
    const strapiUrl = getStrapiURL();

    // Ensure we have an image
    if (!block.image) {
        return null;
    }

    const imageUrl = `${strapiUrl}${block.image.url}`;

    // Validate URL
    try {
        new URL(imageUrl);
    } catch (e) {
        console.error('Invalid image URL:', imageUrl, e);
        return null;
    }

    return (
        <div className="w-full h-[600px]">
            <Image
                src={imageUrl}
                alt={block.image.alternativeText || ""}
                width={600}
                height={600}
                className="w-full h-full object-cover object-center rounded-lg"
            />
        </div>
    );
}
