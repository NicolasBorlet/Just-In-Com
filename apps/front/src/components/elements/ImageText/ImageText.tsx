import { getFullUrl } from "@/utils/get-strapi-url";
import ImageTextType from "./ImageText.type";
import Image from "next/image";
import { AnimatedParagraph, AnimatedText } from "@/animations";

const isVideo = (url: string): boolean => {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv'];
    return videoExtensions.some(ext => url.toLowerCase().endsWith(ext));
};

export default function ImageText({ block }: { block: ImageTextType }) {
    const mediaUrl = block.Media ? getFullUrl(block.Media.url) : null;
    const isVideoMedia = block.Media ? isVideo(block.Media.url) : false;

    return (
        <div className={`flex ${block.reversed ? 'flex-col lg:flex-row-reverse' : 'flex-col lg:flex-row'} gap-8`}>
            {mediaUrl && (isVideoMedia ? (
                <video
                    src={mediaUrl}
                    className="max-w-[450px] rounded-lg"
                    controls
                    autoPlay={false}
                    muted
                    loop
                >
                    Your browser does not support the video tag.
                </video>
            ) : (
                <Image
                    src={mediaUrl}
                    alt={block.Texte.title}
                    className="max-w-[450px] rounded-lg"
                    width={450}
                    height={300}
                />
            ))}
            <div className="flex flex-col gap-8">
                <AnimatedText className="font-medium text-[32px]">{block.Texte.title}</AnimatedText>
                <AnimatedParagraph className="text-xl">{block.Texte.content}</AnimatedParagraph>
            </div>
        </div>
    );
}
