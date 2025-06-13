import type { ImageBlock } from "@/types";
import { getStrapiURL } from "@/utils/get-strapi-url";
import Image from "next/image";

export default function ImageBlock({ block, alt }: { block: ImageBlock, alt: string }) {
    const strapiUrl = getStrapiURL();

    // Ensure we have an image
    if (!block.image) {
        return null;
    }

    const imageUrl = `${strapiUrl}${block.image.url}`;

    // Validate URL
    try {
        const url = new URL(imageUrl);
        // Check if the URL has a valid image extension or is a data URL
        const validImageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
        const hasValidExtension = validImageExtensions.some(ext => url.pathname.toLowerCase().endsWith(ext));
        const isDataUrl = url.protocol === 'data:';

        if (!hasValidExtension && !isDataUrl) {
            throw new Error('Invalid image URL format');
        }
    } catch (e) {
        console.error('Invalid image URL:', imageUrl, e);
        return null;
    }

    return (
        <div className="w-full h-[600px]">
            <Image
                src={imageUrl}
                alt={alt}
                width={600}
                height={600}
                className="w-full h-full object-cover object-center rounded-lg"
            />
        </div>
    );
}
