import HeroSection from "@/components/blocks/HeroSection";
import PageContent from "@/components/globals/PageContent";
import { AboutPageData } from "@/types";

interface AboutPageProps {
    data: AboutPageData;
}

export default function AboutPage({ data }: AboutPageProps) {
    // Trouver le hero section
    const heroSection = data.data.blocks.find(block => block.__component === "blocks.hero-section");

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
