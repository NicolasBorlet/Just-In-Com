import { InfoBlockProps } from "@/types";
import { getStrapiURL } from "@/utils/get-strapi-url";
import Image from "next/image";
import Link from "next/link";
import RichText from "../globals/RichText";

export default function InfoBlock({ block }: InfoBlockProps) {
    const strapiUrl = getStrapiURL();
  return (
    <div className={`px-2 md:px-4 lg:px-5 xl:px-6 flex flex-row gap-8 items-center ${block.reversed ? "flex-row-reverse" : "flex-row"}`}>
      <div className="flex flex-col gap-4 w-3/5">
        <h2 className="text-2xl font-bold">{block.headline}</h2>
        <RichText content={block.content} />
        {block.cta && (
          <Link href={block.cta.href} target={block.cta.isExternal ? "_blank" : "_self"}>
            {block.cta.text}
          </Link>
        )}
      </div>
      <div className="flex flex-col gap-4 w-2/5 rounded-4xl overflow-hidden h-[500px]">
        <Image src={`${strapiUrl}${block.image.url}`} alt={block.image.alternativeText || ""} width={500} height={500} className="object-cover" />
      </div>
    </div>
  );
}
