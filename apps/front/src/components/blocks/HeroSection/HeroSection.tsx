import { HeroSectionProps } from "./HereSection.type";
import { getFullUrl } from "@/utils/get-strapi-url";

export default function HeroSection({ block, isHome = false }: HeroSectionProps) {
  const videoUrl = getFullUrl(block.video?.url);
  const webmUrl = videoUrl ? videoUrl.replace(/\.mp4(\?.*)?$/i, v => v.replace('.mp4', '.webm')) : "";
  const posterUrl = block.poster?.url ? getFullUrl(block.poster.url) : undefined;

  const showHeading = !!block?.heading && !isHome;

  return (
    <div className={`relative w-full ${isHome ? "h-[78vh] md:h-[82vh] mb-8" : "h-screen mb-24"}`}>
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
        poster={posterUrl}
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
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/90 animate-bounce pointer-events-none">
          <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </div>
  );
}
