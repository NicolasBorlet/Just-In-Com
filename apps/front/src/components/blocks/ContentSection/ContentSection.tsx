import { AnimatedHeading, AnimatedParagraph } from "@/animations";
import { AnimatedButton } from "@/animations/AnimatedButton";
import { ButtonAlignment, ButtonWidth } from "@/components/atoms/Button";
import { ContentSectionProps } from "./ContentSection.type";
import MediaBlock from "../MediaBlock/MediaBlock";

export default function ContentSection({ block }: ContentSectionProps) {
  return <div className="flex flex-col gap-8" key={block.id}>
    <div className="flex flex-col gap-4">
    <AnimatedHeading className="text-6xl md:text-8xl/tight text-center font-special" level={2} options={{
      splitType: 'words',
      animationType: 'slideUp',
      duration: 0.5,
      stagger: 0.05
    }}>{block.title}</AnimatedHeading>
    {block.description && <AnimatedParagraph className="text-lg md:text-2xl text-center max-w-3xl mx-auto" options={{
        splitType: 'words',
        animationType: 'slideUp',
        delay: 0.5,
        stagger: 0.01
    }}>{block.description}</AnimatedParagraph>}
    </div>
    <div className={`grid-cols-1 gap-10 ${block.horizontal ? "flex" : "grid"} ${block.grid ? "grid-cols-2" : "grid-cols-1"}`}>
      {Array.isArray(block.gallerie) && block.gallerie.length > 0 && block.gallerie.map((image) => (
        <MediaBlock
          key={image.id}
          block={{ media: image, __component: "elements.media", id: 0 }}
          alt={image.alternativeText || ""}
          enableHoverEffects={true}
        />
      ))}
    </div>
    <AnimatedButton href={block.cta.href} isExternal={block.cta.isExternal} width={ButtonWidth.FIT} alignment={ButtonAlignment.CENTER} ariaLabel={block.cta.text}>{block.cta.text}</AnimatedButton>
  </div>;
}
