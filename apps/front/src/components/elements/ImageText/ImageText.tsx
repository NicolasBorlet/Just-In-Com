"use client";

import { getFullUrl } from "@/utils/get-strapi-url";
import ImageTextType from "./ImageText.type";
import Image from "next/image";
import { AnimatedParagraph, AnimatedText } from "@/animations";
import { useEffect, useRef } from "react";

const isVideo = (url: string): boolean => {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv'];
    return videoExtensions.some(ext => url.toLowerCase().endsWith(ext));
};

export default function ImageText({ block }: { block: ImageTextType }) {
    const mediaUrl = block.Media ? getFullUrl(block.Media.url) : null;
    const isVideoMedia = block.Media ? isVideo(block.Media.url) : false;
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    video.play();
                } else {
                    video.pause();
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(video);
        return () => observer.disconnect();
    }, []);

    const textBlock = (
        <div className="flex flex-col gap-8">
            <AnimatedText className="font-medium text-[32px]">{block.Texte.title}</AnimatedText>
            <AnimatedParagraph className="text-xl">{block.Texte.content}</AnimatedParagraph>
        </div>
    );

    if (isVideoMedia && mediaUrl) {
        return (
            <div className={`flex flex-col ${block.reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8`}>
                {textBlock}
                <div className="lg:w-[60%] lg:shrink-0">
                    <video
                        ref={videoRef}
                        src={mediaUrl}
                        className="w-full rounded-none lg:rounded-lg"
                        muted
                        loop
                        playsInline
                    />
                </div>
            </div>
        );
    }

    return (
        <div className={`flex ${block.reversed ? 'flex-col lg:flex-row-reverse' : 'flex-col lg:flex-row'} gap-8`}>
            {mediaUrl && (
                <Image
                    src={mediaUrl}
                    alt={block.Texte.title}
                    className="max-w-[450px] rounded-lg"
                    width={450}
                    height={300}
                />
            )}
            {textBlock}
        </div>
    );
}
