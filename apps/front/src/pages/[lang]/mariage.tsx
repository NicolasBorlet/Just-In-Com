import { Wedding } from '@/types/wedding';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import { getBuildLocales } from '@/config/language';
import PageContent from '@/components/layout/PageContent';
import { fetchWeddings } from '@/services/weddings/weddingService';
import { fetchAvailableLocales, fetchGlobal } from '@/services/globals/globalsServices';
import { NextSeo } from 'next-seo';
import { buildSeo } from '@/lib/seo';
import { StrapiGlobal } from '@/types';

export const getStaticPaths = async () => {
  const langs = await getBuildLocales();
  return {
    paths: langs.map((lang) => ({ params: { lang } })),
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }: { params: { lang: string } }) => {
  const locale = params.lang;
  const [weddingRes, globalRes, availableLocales] = await Promise.all([
    fetchWeddings({ locale }),
    fetchGlobal({ locale }),
    fetchAvailableLocales(),
  ]);

  if (!weddingRes.data || !globalRes.data || !globalRes.data.logo_extensed) {
    return { notFound: true };
  }

  return {
    props: {
      wedding: weddingRes.data,
      global: globalRes.data,
      lang: locale,
      availableLocales,
    },
    revalidate: 3600,
  };
};

export default function Mariage({
  wedding,
  global,
  lang,
  availableLocales,
}: {
  wedding: Wedding;
  global?: StrapiGlobal;
  lang: string;
  availableLocales: string[];
}) {
  const renderedBlocks = BlockRenderer({ blocks: wedding.blocks });
  const weddingData = wedding as Wedding & { seo?: import("@/types").StrapiSeo };

  return (
    <>
      <NextSeo
        {...buildSeo({
          seo: weddingData.seo,
          lang,
          basePath: "mariage",
          fallbackTitle: "Mariage",
        })}
      />
      {renderedBlocks.heroSection}
      <PageContent global={global} lang={lang} availableLocales={availableLocales}>
        {renderedBlocks.otherBlocks}
      </PageContent>
    </>
  );
}
