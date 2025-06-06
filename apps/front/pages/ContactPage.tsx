import HeroSection from "@/components/blocks/HeroSection";
import ContactForm from "@/components/elements/ContactForm";
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
                <div className="flex flex-col gap-24">
                    <div className="max-w-2xl mx-auto w-full">
                        <h2 className="text-3xl font-bold mb-8">Contactez-nous</h2>
                        <ContactForm />
                    </div>
                </div>
            </PageContent>
        </div>
    );
}
