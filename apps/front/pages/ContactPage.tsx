import HeroSection from "@/components/blocks/HeroSection";
import ContactForm from "@/components/elements/ContactForm";
import PageContent from "@/components/globals/PageContent";
import { ContactPageData } from "@/types";

interface ContactPageProps {
    data: ContactPageData;
}

export default function ContactPage({ data }: ContactPageProps) {
    const heroSection = data?.data?.blocks?.find(block => block.__component === "blocks.hero-section");

    if (!heroSection) return null;

    return (
        <div className="flex flex-col gap-24">
            {heroSection && <HeroSection key={heroSection.id} block={heroSection} />}
            <PageContent>
                <div className="flex flex-col gap-24">
                    <div className="max-w-2xl mx-auto w-full text-quaternary text-lg">
                        <p className="mb-24 text-center">Pour toute demande ou pour une demande de devis, vous pouvez remplir le formulaire ci-dessous. Je vous réponds dans les plus bref délais.  </p>
                        <ContactForm />
                    </div>
                </div>
            </PageContent>
        </div>
    );
}
