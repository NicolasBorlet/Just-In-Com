import HeroSection from "@/components/blocks/HeroSection";
import PageContent from "@/components/globals/PageContent";
import { MariagePageData } from "@/types";

interface MariagePageProps {
    data: MariagePageData;
}

export default function MariagePage({ data }: MariagePageProps) {
    // Trouver le hero section
    const heroSection = data?.data?.blocks?.find(block => block.__component === "blocks.hero-section");

    return (
        <div className="flex flex-col gap-24">
        {heroSection && <HeroSection key={heroSection.id} block={heroSection} />}
        <PageContent>
            <div className="flex flex-col gap-24">

            </div>
        </PageContent>
        </div>
    );
}
