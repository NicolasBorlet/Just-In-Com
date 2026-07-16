import { AnimatedImage } from "@/animations";
import { getFullUrl } from "@/utils/get-strapi-url";
import { MediaBlock as MediaBlockType } from "./MediaBlock.type";
import VideoWithSound from "@/components/atoms/VideoWithSound";

interface MediaBlockProps {
    block: MediaBlockType;
    alt: string;
    width?: number;
    height?: number;
    priority?: boolean;
    enableHoverEffects?: boolean;
    noRadius?: boolean;
    smallHeight?: boolean;
    onClick?: () => void;
    style?: React.CSSProperties;
    /** Autoplay + hover unmute for gallery videos */
    autoplayWithSound?: boolean;
    parallax?: boolean;
}

export default function MediaBlock({
  block,
  alt,
  width = 600,
  height = 600,
  priority = false,
  enableHoverEffects = false,
  noRadius = false,
  smallHeight = false,
  onClick,
  autoplayWithSound = false,
  parallax = false,
}: MediaBlockProps) {
    const mediaData = block.media || (block as unknown as { media?: MediaBlockType["media"] }).media;
    if (!mediaData) {
        console.error('No media data found in block:', block);
        return null;
    }

    const media = mediaData.url ? mediaData : (mediaData as unknown as { media?: { url: string; alternativeText?: string; mime?: string } }).media;
    if (!media || !media.url) {
        console.error('Invalid media structure:', mediaData);
        return null;
    }

    const mediaUrl = getFullUrl(media.url);

    try {
        const url = new URL(mediaUrl);
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

    const heightClass = smallHeight
      ? 'md:h-[420px] h-[70vw]'
      : autoplayWithSound
        ? 'md:h-[480px] h-[220px]'
        : 'md:h-[600px] h-[250px]';

    return (
        <div
            className={`w-full ${heightClass} relative overflow-hidden ${noRadius ? '' : 'rounded-lg'} group ${enableHoverEffects ? 'cursor-pointer' : ''}`}
            onClick={onClick}
        >
            {isVideo ? (
                autoplayWithSound ? (
                  <VideoWithSound
                    src={mediaUrl}
                    className="absolute inset-0 h-full w-full"
                    parallax={parallax ? 1 : 0}
                    compact
                  />
                ) : (
                  <video
                      src={mediaUrl}
                      controls
                      className={`w-full h-full object-cover object-center transition-transform duration-500 ${enableHoverEffects ? 'group-hover:scale-110' : ''}`}
                      preload="metadata"
                  />
                )
            ) : (
                <AnimatedImage
                    src={mediaUrl}
                    alt={alt || media.alternativeText || "Media"}
                    width={width}
                    height={height}
                    containerClassName="w-full h-full"
                    className={`object-cover object-center transition-transform duration-500 ${enableHoverEffects ? 'group-hover:scale-110' : ''}`}
                    priority={priority}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            )}
        </div>
    );
}
