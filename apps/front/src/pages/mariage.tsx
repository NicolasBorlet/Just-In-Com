import React from 'react';
import { Wedding } from '@/types/wedding';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import PageContent from '@/components/layout/PageContent';
import { fetchWeddings } from '@/services/weddings/weddingService';
import { fetchAvailableLocales, fetchGlobal } from "@/services/globals/globalsServices";

export const getStaticProps = async () => {
  const [weddingRes, globalRes, availableLocales] = await Promise.all([fetchWeddings({ locale: 'fr' }), fetchGlobal({ locale: 'fr' }), fetchAvailableLocales()]);

  return {
    props: {
      weddings: weddingRes.data,
      global: globalRes.data,
      availableLocales,
      lang: 'fr',
    },
  };
};

export default function Mariage({ weddings, global, lang, availableLocales }: { global: any, weddings: Wedding, lang: string, availableLocales: string[] }) {

  const renderedBlocks = BlockRenderer({ blocks: weddings.blocks });

  return (
    <>
      {renderedBlocks.heroSection}
      <PageContent global={global} lang={lang} availableLocales={availableLocales}>
        {renderedBlocks.otherBlocks}
      </PageContent>
    </>
  );
}
