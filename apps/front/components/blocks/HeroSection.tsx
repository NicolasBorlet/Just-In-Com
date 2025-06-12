import { HeroSectionProps } from "@/types";
import { getStrapiURL } from "@/utils/get-strapi-url";

export default function HeroSection({ block }: HeroSectionProps) {
    const strapiUrl = getStrapiURL();

  return (
    <div className="relative h-screen w-full">
      <video
        src={`${strapiUrl}${block.video.url}`}
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
      />
      {block.heading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-7xl md:text-9xl font-bold text-white font-special">{block.heading}</h1>
        </div>
      )}
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}
