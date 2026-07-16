"use client";

import { getFullUrl } from "@/utils/get-strapi-url";
import ImageTextType from "./ImageText.type";
import Image from "next/image";
import { AnimatedParagraph, AnimatedText } from "@/animations";
import VideoWithSound from "@/components/atoms/VideoWithSound";

const isVideo = (url: string): boolean => {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv'];
    return videoExtensions.some(ext => url.toLowerCase().endsWith(ext));
};

export default function ImageText({
  block,
  parallax = false,
  compactMedia = false,
}: {
  block: ImageTextType;
  parallax?: boolean;
  compactMedia?: boolean;
}) {
    const mediaUrl = block.Media ? getFullUrl(block.Media.url) : null;
    const isVideoMedia = block.Media ? isVideo(block.Media.url) : false;

    const textBlock = (
        <div className="flex flex-col gap-8">
            <AnimatedText className="font-medium text-[32px]">{block.Texte.title}</AnimatedText>
            <AnimatedParagraph className="text-xl">{block.Texte.content}</AnimatedParagraph>
        </div>
    );

    if (isVideoMedia && mediaUrl) {
        return (
            <div className={`flex flex-col ${block.reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 items-center`}>
                {textBlock}
                <div className={`${compactMedia ? 'lg:w-[45%]' : 'lg:w-[55%]'} lg:shrink-0 w-full`}>
                    <VideoWithSound
                      src={mediaUrl}
                      compact={compactMedia}
                      parallax={parallax ? 1.2 : 0}
                      className="rounded-none lg:rounded-lg w-full"
                    />
                </div>
            </div>
        );
    }

    return (
        <div className={`flex ${block.reversed ? 'flex-col lg:flex-row-reverse' : 'flex-col lg:flex-row'} gap-8 items-center`}>
            {mediaUrl && (
                <Image
                    src={mediaUrl}
                    alt={block.Texte.title}
                    className={`${compactMedia ? 'max-w-[280px] md:max-w-[320px]' : 'max-w-[380px]'} rounded-lg w-full h-auto`}
                    width={compactMedia ? 320 : 380}
                    height={compactMedia ? 220 : 260}
                />
            )}
            {textBlock}
        </div>
    );
}
