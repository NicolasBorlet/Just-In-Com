import { ContentSection as ContentSectionType } from "@/types";
import MediaBlock from "../elements/Media";
import Button, { ButtonAlignment, ButtonWidth } from "../globals/Button";

export default function ContentSection({ block }: { block: ContentSectionType }) {
  return <div className="flex flex-col gap-12" key={block.id}>
    <div className="flex flex-col gap-4">
    <h2 className="text-6xl md:text-8xl text-center font-special">{block.title}</h2>
    {block.description && <p className="text-lg md:text-2xl text-center max-w-3xl mx-auto">{block.description}</p>}
    </div>
    <div className={`grid-cols-1 gap-10 ${block.horizontal ? "flex" : "grid"} ${block.grid ? "grid-cols-2" : "grid-cols-1"}`}>
      {block.gallerie.map((image) => (
        <MediaBlock key={image.id} block={{ media: image, __component: "elements.media", id: 0 }} alt={image.alternativeText || ""} />
      ))}
    </div>
    <Button href={block.cta.href} isExternal={block.cta.isExternal} width={ButtonWidth.FIT} alignment={ButtonAlignment.CENTER}>{block.cta.text}</Button>
  </div>;
}
