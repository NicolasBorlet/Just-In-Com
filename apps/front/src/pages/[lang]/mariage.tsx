import { useEffect } from 'react';
import { supportedLanguages } from '@/config/language';
import { Wedding } from '@/types/wedding';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import PageContent from '@/components/layout/PageContent';
import { fetchWeddings } from '@/services/weddings/weddingService';
import { fetchAvailableLocales, fetchGlobal } from '@/services/globals/globalsServices';

export const getStaticPaths = async () => {
  return {
    paths: supportedLanguages.map((lang) => ({ params: { lang } })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: { params: { lang: string } }) => {
  const [weddingRes, globalRes, availableLocales] = await Promise.all([
    fetchWeddings({ locale: params.lang }),
    fetchGlobal({ locale: params.lang }),
    fetchAvailableLocales()
  ]);
  return {
    props: {
      wedding: weddingRes.data,
      global: globalRes.data,
      lang: params.lang,
      availableLocales,
    },
  };
};

export default function Mariage({
  wedding,
  global,
  lang,
  availableLocales,
}: {
  wedding: Wedding;
  global?: any;
  lang: string;
  availableLocales: string[];
}) {
  useEffect(() => {
    if (wedding) {
      console.log('Wedding data:', wedding);
    }

    if (global) {
      console.log('Global data:', global);
    }
  }, [wedding, global]);

  const renderedBlocks = BlockRenderer({ blocks: wedding.blocks });

  return (
    <>
      {renderedBlocks.heroSection}
      <PageContent global={global} lang={lang} availableLocales={availableLocales}>
        {renderedBlocks.otherBlocks}
      </PageContent>
    </>
  );
}
