"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface VideoWithSoundProps {
  src: string;
  className?: string;
  poster?: string;
  /** Parallax intensity (0 = off). Seed.com-style scroll movement. */
  parallax?: number;
  /** Cap video height for smaller embeds */
  compact?: boolean;
}

export default function VideoWithSound({
  src,
  className = "",
  poster,
  parallax = 0,
  compact = false,
}: VideoWithSoundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [unmuted, setUnmuted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => undefined);
        } else {
          video.pause();
          video.muted = true;
          setUnmuted(false);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  useEffect(() => {
    if (!parallax || !containerRef.current) return;

    const el = containerRef.current;
    const video = videoRef.current;
    if (!video) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      const progress = (viewH / 2 - (rect.top + rect.height / 2)) / viewH;
      video.style.transform = `translate3d(0, ${progress * parallax * 40}px, 0) scale(1.12)`;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [parallax]);

  const unmute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    setUnmuted(true);
    video.play().catch(() => undefined);
  }, []);

  const mute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    setUnmuted(false);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden group ${compact ? "max-h-[360px] md:max-h-[420px]" : ""} ${className}`}
      onMouseEnter={unmute}
      onMouseLeave={mute}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className={`w-full h-full object-cover pointer-events-none transition-transform duration-100 ease-out ${compact ? "max-h-[360px] md:max-h-[420px]" : ""}`}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
      />
      <button
        type="button"
        onClick={() => (unmuted ? mute() : unmute())}
        className="absolute bottom-3 right-3 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
        aria-label={unmuted ? "Couper le son" : "Activer le son"}
      >
        {unmuted ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
          </svg>
        )}
      </button>
    </div>
  );
}
