import React, { useEffect } from 'react';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import PageContent from '@/components/layout/PageContent';
import { fetchAbout } from '@/services/about/aboutService';
import { fetchAvailableLocales, fetchGlobal } from "@/services/globals/globalsServices";

export const getStaticProps = async () => {
  const [aboutRes, globalRes, availableLocales] = await Promise.all([fetchAbout({ locale: 'fr' }), fetchGlobal({ locale: 'fr' }), fetchAvailableLocales()]);

  return {
    props: {
      about: aboutRes.data,
      global: globalRes.data,
      availableLocales,
      lang: 'fr',
    },
  };
};

export default function About({ about, global, lang, availableLocales }: { global: any, about: any, lang: string, availableLocales: string[] }) {

  const renderedBlocks = BlockRenderer({ blocks: about.blocks });

  return (
    <>
      {renderedBlocks.heroSection}
      <PageContent global={global} lang={lang} availableLocales={availableLocales}>
        {renderedBlocks.otherBlocks}
      </PageContent>
    </>
  );
}
