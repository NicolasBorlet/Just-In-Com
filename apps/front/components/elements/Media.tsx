import type { MediaBlock } from "@/types";
import { getStrapiURL } from "@/utils/get-strapi-url";
import Image from "next/image";

interface MediaBlockProps {
    block: MediaBlock;
    alt: string;
    width?: number;
    height?: number;
    priority?: boolean;
}

export default function MediaBlock({ block, alt, width = 600, height = 600, priority = false }: MediaBlockProps) {
    const strapiUrl = getStrapiURL();

    // Handle both direct media blocks and gallery media items
    const mediaData = block.media || (block as any).media;
    if (!mediaData) {
        console.error('No media data found in block:', block);
        return null;
    }

    // If we're dealing with a gallery item, extract the media object
    const media = mediaData.url ? mediaData : (mediaData as any).media;
    if (!media || !media.url) {
        console.error('Invalid media structure:', mediaData);
        return null;
    }

    const mediaUrl = `${strapiUrl}${media.url}`;

    // Validate URL
    try {
        const url = new URL(mediaUrl);
        // Check if the URL has a valid media extension
        const validImageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
        const validVideoExtensions = ['.mp4', '.webm', '.ogg'];
        const hasValidExtension = [...validImageExtensions, ...validVideoExtensions].some(ext => url.pathname.toLowerCase().endsWith(ext));
        const isDataUrl = url.protocol === 'data:';

        if (!hasValidExtension && !isDataUrl) {
            throw new Error('Invalid media URL format');
        }
    } catch (e) {
        console.error('Invalid media URL:', mediaUrl, e);
        return null;
    }

    const isVideo = media.mime?.startsWith('video/') ||
                   ['.mp4', '.webm', '.ogg'].some(ext => mediaUrl.toLowerCase().endsWith(ext));

    return (
        <div className="w-full h-[600px] relative">
            {isVideo ? (
                <video
                    src={mediaUrl}
                    controls
                    className="w-full h-full object-cover object-center rounded-lg"
                    preload="metadata"
                />
            ) : (
                <Image
                    src={mediaUrl}
                    alt={alt || media.alternativeText || "Media"}
                    width={width}
                    height={height}
                    className="w-full h-full object-cover object-center rounded-lg"
                    priority={priority}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            )}
        </div>
    );
}
