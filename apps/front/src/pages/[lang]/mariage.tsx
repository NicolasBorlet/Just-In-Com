import { BlogType } from '@/types';
import React, { useEffect } from 'react';
import { supportedLanguages } from '@/config/language';
import { Wedding } from '@/types/wedding';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import PageContent from '@/components/layout/PageContent';
import { fetchWeddings } from '@/services/weddings/weddingService';
import { fetchGlobal } from '@/services/globals/globalsServices';

export const getStaticPaths = async () => {
  return {
    paths: supportedLanguages.map(lang => ({ params: { lang } })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: { params: { lang: string } }) => {
  const [weddingRes, globalRes] = await Promise.all([fetchWeddings(), fetchGlobal()]);
  return {
    props: {
      wedding: weddingRes.data,
      global: globalRes.data,
      lang: params.lang,
    },
  };
};

export default function Mariage({ weddings, lang }: { result: BlogType, weddings: Wedding, lang: string }) {

  useEffect(() => {
    console.log('Weddings data:', weddings);
  }, [weddings]);

  const renderedBlocks = BlockRenderer({ blocks: weddings.blocks });

  return (
    <>
      {renderedBlocks.heroSection}
      <PageContent global={global} lang={lang}>
        {renderedBlocks.otherBlocks}
      </PageContent>
    </>
  );
}
