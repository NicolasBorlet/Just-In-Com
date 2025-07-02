import { InfoBlockProps } from "@/types";
import { getStrapiURL } from "@/utils/get-strapi-url";
import { AnimatedButton } from "../animations/AnimatedButton";
import { AnimatedImage } from "../animations/AnimatedImage";
import { AnimatedHeading } from "../animations/AnimatedText";
import { ButtonAlignment, ButtonWidth } from "../globals/Button";
import RichText from "../globals/RichText";

export default function InfoBlock({ block }: InfoBlockProps) {
    const strapiUrl = getStrapiURL();
  return (
    <div className={`px-2 md:px-4 lg:px-5 xl:px-6 flex flex-col md:flex-row gap-8 lg:gap-20 items-center ${block.reversed ? "md:flex-row-reverse" : "md:flex-row"}`}>
      <div className="flex flex-col gap-4 w-full md:w-3/5">
        <AnimatedHeading
            className="text-6xl md:text-8xl/tight font-special"
            level={1}
            options={{
                splitType: 'words',
                animationType: 'slideUp',
                duration: 0.5,
                stagger: 0.1
            }}
        >
            {block.headline}
        </AnimatedHeading>
        <RichText content={block.content} />
        {block.cta && (
          <AnimatedButton href={block.cta.href} isExternal={block.cta.isExternal} width={ButtonWidth.FIT} alignment={ButtonAlignment.LEFT} ariaLabel={block.cta.text}>
            {block.cta.text}
          </AnimatedButton>
        )}
      </div>
        <AnimatedImage src={`${strapiUrl}${block.image.url}`} alt={block.image.alternativeText || ""} width={340} height={500} containerClassName="object-cover w-3/5 md:w-2/5 self-center rounded-4xl h-[300px] md:h-[500px]"/>
    </div>
  );
}
