import React, { useEffect } from 'react';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import PageContent from '@/components/layout/PageContent';
import { fetchProfessionnels } from '@/services/professionnels/professionnelService';
import { fetchAvailableLocales, fetchGlobal } from "@/services/globals/globalsServices";

export const getStaticProps = async () => {
    const [professionnelsRes, globalRes, availableLocales] = await Promise.all([fetchProfessionnels({ locale: 'fr' }), fetchGlobal({ locale: 'fr' }), fetchAvailableLocales()]);

    console.log("professionnelsRes", professionnelsRes.data.blocks);

    return {
        props: {
            professionnels: professionnelsRes.data,
            global: globalRes.data,
            availableLocales,
            lang: 'fr',
        },
    };
};

export default function Professionnels({ professionnels, global, lang, availableLocales }: { global: any, professionnels: any, lang: string, availableLocales: string[] }) {

    const renderedBlocks = BlockRenderer({ blocks: professionnels.blocks });

    useEffect(() => {
        console.log("renderedBlocks", renderedBlocks);
    }, [renderedBlocks]);

    return (
        <>
            {renderedBlocks.heroSection}
            <PageContent global={global} lang={lang} availableLocales={availableLocales}>
                {renderedBlocks.otherBlocks}
            </PageContent>
        </>
    );
}
