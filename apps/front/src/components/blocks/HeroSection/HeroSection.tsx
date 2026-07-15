import { HeroSectionProps } from "./HereSection.type";
import { getFullUrl } from "@/utils/get-strapi-url";

export default function HeroSection({ block, isHome = false }: HeroSectionProps) {
  const videoUrl = getFullUrl(block.video?.url);
  const webmUrl = videoUrl ? videoUrl.replace(/\.mp4(\?.*)?$/i, v => v.replace('.mp4', '.webm')) : "";
  const posterUrl = block.poster?.url ? getFullUrl(block.poster.url) : undefined;

  // The heading is rendered as the page H1 (server-side) on inner pages.
  // The home page keeps a clean visual (logo only) and provides its own
  // visually-hidden H1, so we don't render a heading here in that case.
  const showHeading = !!block?.heading && !isHome;

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
    </div>
  );
}
