import { InfoBlockProps } from "@/types";
import { getStrapiURL } from "@/utils/get-strapi-url";
import Image from "next/image";
import Button, { ButtonWidth } from "../globals/Button";
import RichText from "../globals/RichText";

export default function InfoBlock({ block }: InfoBlockProps) {
    const strapiUrl = getStrapiURL();
  return (
    <div className={`px-2 md:px-4 lg:px-5 xl:px-6 flex flex-col md:flex-row gap-8 lg:gap-20 items-center ${block.reversed ? "md:flex-row-reverse" : "md:flex-row"}`}>
      <div className="flex flex-col gap-4 w-full md:w-3/5">
        <h1 className="text-6xl">{block.headline}</h1>
        <RichText content={block.content} />
        {block.cta && (
          <Button href={block.cta.href} isExternal={block.cta.isExternal} width={ButtonWidth.FIT}>
            {block.cta.text}
          </Button>
        )}
      </div>
        <Image src={`${strapiUrl}${block.image.url}`} alt={block.image.alternativeText || ""} width={340} height={500} className="object-cover md:w-2/5 self-center rounded-4xl h-[500px]"/>
    </div>
  );
}
