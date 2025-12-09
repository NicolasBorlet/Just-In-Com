import { getFullUrl } from "@/utils/get-strapi-url";
import ImageTextType from "./ImageText.type";
import { useEffect } from "react";
import { AnimatedParagraph, AnimatedText } from "@/animations";

// Helper function to check if the URL is a video
const isVideo = (url: string): boolean => {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv'];
    return videoExtensions.some(ext => url.toLowerCase().endsWith(ext));
};

export default function ImageText({ block }: { block: ImageTextType }) {

    useEffect(() => {
        console.log("block", block);
    }, [block]);

    const mediaUrl = getFullUrl(block.Media.url);
    const isVideoMedia = isVideo(block.Media.url);

    return (
        <div className={`flex ${block.reversed ? 'flex-row-reverse' : 'flex-row'} gap-8`}>
            {isVideoMedia ? (
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
                <img
                    src={mediaUrl}
                    alt={block.Texte.title}
                    className="max-w-[450px] rounded-lg"
                />
            )}
            <div className="flex flex-col gap-8">
                <AnimatedText className="font-medium text-[32px]">{block.Texte.title}</AnimatedText>
                <AnimatedParagraph className="text-xl">{block.Texte.content}</AnimatedParagraph>
            </div>
        </div>
    );
}