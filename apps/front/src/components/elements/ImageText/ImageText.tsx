"use client";

import { getFullUrl } from "@/utils/get-strapi-url";
import ImageTextType from "./ImageText.type";
import Image from "next/image";
import { AnimatedParagraph, AnimatedText } from "@/animations";
import { useCallback, useEffect, useRef, useState } from "react";

const isVideo = (url: string): boolean => {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv'];
    return videoExtensions.some(ext => url.toLowerCase().endsWith(ext));
};

function VideoMedia({ src }: { src: string }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMuted, setIsMuted] = useState(true);

    // Autoplay (muted) while in view, pause when out of view.
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    video.play().catch(() => { });
                } else {
                    video.pause();
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(video);
        return () => observer.disconnect();
    }, []);

    // Subtle parallax: the video drifts as the block scrolls through the viewport.
    useEffect(() => {
        const container = containerRef.current;
        const video = videoRef.current;
        if (!container || !video) return;

        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced) return;

        let frame = 0;

        const update = () => {
            frame = 0;
            const rect = container.getBoundingClientRect();
            const viewportH = window.innerHeight || document.documentElement.clientHeight;
            const denom = viewportH / 2 + rect.height / 2;
            let progress = (rect.top + rect.height / 2 - viewportH / 2) / denom;
            progress = Math.max(-1, Math.min(1, progress));
            // Keep the drift proportional to height (< the 7.5% overflow from scale 1.15) so edges never show.
            const maxOffset = rect.height * 0.05;
            const offset = -progress * maxOffset;
            video.style.transform = `translateY(${offset.toFixed(1)}px) scale(1.15)`;
        };

        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });
        return () => {
            if (frame) cancelAnimationFrame(frame);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    const setMuted = useCallback((muted: boolean) => {
        const video = videoRef.current;
        if (!video) return;
        video.muted = muted;
        setIsMuted(muted);
        if (!muted) video.play().catch(() => { });
    }, []);

    return (
        <div
            ref={containerRef}
            className="group relative overflow-hidden rounded-none lg:rounded-lg"
            onMouseEnter={() => setMuted(false)}
            onMouseLeave={() => setMuted(true)}
        >
            <video
                ref={videoRef}
                src={src}
                className="w-full will-change-transform"
                style={{ transform: "scale(1.15)" }}
                muted
                loop
                playsInline
            />

            {/* Sound toggle / speaker indicator */}
            <button
                type="button"
                onClick={() => setMuted(!isMuted)}
                aria-label={isMuted ? "Activer le son" : "Couper le son"}
                className="absolute bottom-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-all duration-300 hover:bg-black/70 opacity-90 md:opacity-0 md:group-hover:opacity-100"
            >
                {isMuted ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M11 5 6 9H2v6h4l5 4V5Z" fill="currentColor" />
                        <path d="m23 9-6 6M17 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M11 5 6 9H2v6h4l5 4V5Z" fill="currentColor" />
                        <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                )}
            </button>
        </div>
    );
}

export default function ImageText({ block }: { block: ImageTextType }) {
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
            <div className={`flex flex-col ${block.reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8`}>
                {textBlock}
                <div className="lg:w-[60%] lg:shrink-0">
                    <VideoMedia src={mediaUrl} />
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
