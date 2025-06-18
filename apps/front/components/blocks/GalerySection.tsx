import { GallerieSection as GallerieSectionType } from "@/types";
import MediaBlock from "../elements/Media";
import Button, { ButtonAlignment, ButtonWidth } from "../globals/Button";

export default function GalerySection({ block }: { block: GallerieSectionType }) {
  return <div className="flex flex-col gap-12" key={block.id}>
    <div className="flex flex-col gap-4">
    <h2 className="text-4xl md:text-4xl text-center font-special">{block.title}</h2>
    {block.description && <p className="text-lg md:text-xl text-center max-w-3xl mx-auto">{block.description}</p>}
    </div>
    <div className={`grid-cols-1 md:grid-cols-2 gap-10 grid`}>
      {block.galery.map((image) => (
        <MediaBlock key={image.id} block={{ media: image, __component: "elements.media", id: 0 }} alt={image.alternativeText || ""} width={800} height={800} />
      ))}
    </div>
    <Button href={block.cta.href} isExternal={block.cta.isExternal} width={ButtonWidth.FIT} alignment={ButtonAlignment.CENTER}>{block.cta.text}</Button>
  </div>;
}
