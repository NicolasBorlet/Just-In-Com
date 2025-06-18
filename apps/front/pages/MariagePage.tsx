import ContentSection from "@/components/blocks/ContentSection";
import GalerySection from "@/components/blocks/GalerySection";
import HeroSection from "@/components/blocks/HeroSection";
import MediaBlock from "@/components/elements/Media";
import TextBlock from "@/components/elements/TextBlock";
import PageContent from "@/components/globals/PageContent";
import { MariagePageData } from "@/types";

interface MariagePageProps {
    data: MariagePageData;
}

export default function MariagePage({ data }: MariagePageProps) {
     // Trouver le hero section
     const heroSection = data?.data?.blocks?.find(block => block.__component === "blocks.hero-section");

     // Filtrer les autres blocs
     const otherBlocks = data?.data?.blocks?.filter(block => block.__component !== "blocks.hero-section") || [];

     console.log("otherBlocks", otherBlocks);

    return (
        <div className="flex flex-col gap-24">
        {heroSection && <HeroSection key={heroSection.id} block={heroSection} />}
        <PageContent>
            <div className="flex flex-col gap-24">
                {otherBlocks?.map((block) => {
                    if (!block) return null;

                    if (block.__component === "elements.text-box") {
                        return <TextBlock key={block.id} block={block} />;
                    }
                    if (block.__component === "elements.media") {
                        return <MediaBlock key={block.id + 23} block={block} alt={block.media?.alternativeText || "Media"} />;
                    }
                    if (block.__component === "blocks.content-section") {
                        return <ContentSection key={block.id} block={block} />;
                    }
                    if (block.__component === "blocks.gallerie-section") {
                        return <GalerySection key={block.id} block={block} />;
                    }
                    return null;
                })}
            </div>
        </PageContent>
        </div>
    );
}
