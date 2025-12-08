import React from 'react';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import PageContent from '@/components/layout/PageContent';
import { fetchContact } from '@/services/contact/contactService';
import { fetchAvailableLocales, fetchGlobal } from "@/services/globals/globalsServices";
import ContactForm from '@/components/elements/ContactForm/ContactForm';

export const getStaticProps = async () => {
    const [contactRes, globalRes, availableLocales] = await Promise.all([fetchContact({ locale: 'fr' }), fetchGlobal({ locale: 'fr' }), fetchAvailableLocales()]);

    return {
        props: {
            contact: contactRes.data,
            global: globalRes.data,
            availableLocales,
            lang: 'fr',
        },
    };
};

export default function Contact({ contact, global, lang, availableLocales }: { global: any, contact: any, lang: string, availableLocales: string[] }) {

    const renderedBlocks = BlockRenderer({ blocks: contact.blocks });

    return (
        <>
            {renderedBlocks.heroSection}
            <PageContent global={global} lang={lang} availableLocales={availableLocales}>
                <div className="flex flex-col gap-12 md:gap-24">
                    <div className="max-w-2xl mx-auto w-full text-quaternary text-lg">
                        <p className="mb-24 text-center">Pour toute demande ou pour une demande de devis, vous pouvez remplir le formulaire ci-dessous. Je vous réponds dans les plus bref délais.  </p>
                        <ContactForm />
                    </div>
                </div>
            </PageContent>
        </>
    );
}
