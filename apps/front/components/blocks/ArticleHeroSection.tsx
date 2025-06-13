import { Media } from "@/types";
import { getStrapiURL } from "@/utils/get-strapi-url";
import Image from "next/image";

export default function ArticleHeroSection({ cover }: { cover: Media }) {
    const strapiUrl = getStrapiURL();

    console.log("cover", cover);

  return (
    <div className="relative h-[70vh] w-full">
      <Image
        src={`${strapiUrl}${cover.url}`}
        alt={cover.alternativeText || ""}
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}
