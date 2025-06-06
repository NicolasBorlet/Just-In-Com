import HeroSection from "@/components/blocks/HeroSection";
import PageContent from "@/components/globals/PageContent";
import { ContactPageData } from "@/types";

interface ContactPageProps {
    data: ContactPageData;
}

export default function ContactPage({ data }: ContactPageProps) {
    const heroSection = data.data.blocks.find(block => block.__component === "blocks.hero-section");

    return (
        <div className="flex flex-col gap-24">
        {heroSection && <HeroSection key={heroSection.id} block={heroSection} />}
        <PageContent>
            <div className="flex flex-col gap-24"></div>
        </PageContent>
        </div>
    );
}
