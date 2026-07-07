import { useEffect, useState } from 'react';
import { HeroSectionProps } from "./HereSection.type";
import { getFullUrl } from "@/utils/get-strapi-url";

export default function HeroSection({ block }: HeroSectionProps) {
  const videoUrl = getFullUrl(block.video?.url);
  const webmUrl = videoUrl ? videoUrl.replace(/\.mp4(\?.*)?$/i, v => v.replace('.mp4', '.webm')) : "";

  // Avoid SSR/client mismatch: don't rely on `window` during render.
  // Only decide to show the heading / scroll cue on the client after mount.
  const [showHeading, setShowHeading] = useState(false);
  const [isHome, setIsHome] = useState(false);

  useEffect(() => {
    const home = window.location.pathname === '/' || /^\/[a-z]{2}$/.test(window.location.pathname);
    setIsHome(home);
    setShowHeading(!!block?.heading && !home);
  }, [block?.heading]);

  const scrollDown = () => {
    window.scrollTo({ top: window.innerHeight * 0.9, behavior: "smooth" });
  };

  return (
    <div className="relative h-screen w-full mb-24">
      <video
        src={videoUrl}
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        preload="none"
      >
        {videoUrl && <source src={videoUrl} type="video/mp4" />}
        {webmUrl && <source src={webmUrl} type="video/webm" />}
      </video>
      {showHeading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-7xl md:text-9xl font-bold text-white font-special">{block.heading}</h1>
        </div>
      )}
      <div className="absolute inset-0 bg-black/20" />

      {isHome && (
        <button
          type="button"
          onClick={scrollDown}
          aria-label="Découvrir la suite"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/90 hover:text-white transition-colors"
        >
          <span className="text-sm uppercase tracking-[0.25em] font-sans">Découvrir</span>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="animate-bounce" aria-hidden="true">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  );
}
