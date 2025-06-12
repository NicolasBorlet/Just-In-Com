import HeroSection from "@/components/blocks/HeroSection";
import ImageBlock from "@/components/elements/Image";
import TextBlock from "@/components/elements/TextBlock";
import PageContent from "@/components/globals/PageContent";
import { EntreprisePageData } from "@/types";

interface EntreprisePageProps {
    data: EntreprisePageData;
}

export default function EntreprisePage({ data }: EntreprisePageProps) {
    // Trouver le hero section
    const heroSection = data?.data?.blocks?.find(block => block.__component === "blocks.hero-section");

    // Filtrer les autres blocs
    const otherBlocks = data?.data?.blocks?.filter(block => block.__component !== "blocks.hero-section");

    if (!heroSection || !otherBlocks) return null;

    return (
        <div className="flex flex-col gap-24">
        {heroSection && <HeroSection key={heroSection.id} block={heroSection} />}
        <PageContent>
            <div className="flex flex-col gap-24">
                {otherBlocks.map((block) => {
                    if (block.__component === "elements.text-box") {
                        return <TextBlock key={block.id} block={block} />;
                    }
                    if (block.__component === "elements.image") {
                        return <ImageBlock key={block.id + 23} block={block} alt={block.image.alternativeText || "Image"} />;
                    }
                    return null;
                })}
            </div>
        </PageContent>
        </div>
    );
}
