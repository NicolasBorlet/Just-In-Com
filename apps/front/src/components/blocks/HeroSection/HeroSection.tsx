import { useEffect, useState } from 'react';
import { HeroSectionProps } from "./HereSection.type";
import { getFullUrl } from "@/utils/get-strapi-url";

export default function HeroSection({ block }: HeroSectionProps) {
  const videoUrl = getFullUrl(block.video?.url);
  const webmUrl = videoUrl ? videoUrl.replace(/\.mp4(\?.*)?$/i, v => v.replace('.mp4', '.webm')) : "";

  // Avoid SSR/client mismatch: don't rely on `window` during render.
  // Only decide to show the heading on the client after mount.
  const [showHeading, setShowHeading] = useState(false);

  useEffect(() => {
    const isHome = window.location.pathname === '/' || /^\/[a-z]{2}$/.test(window.location.pathname);
    setShowHeading(!!block?.heading && !isHome);
  }, [block?.heading]);

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
    </div>
  );
}
