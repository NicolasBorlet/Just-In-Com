import BlockRenderer from '@/components/blocks/BlockRenderer';
import { getBuildLocales } from '@/config/language';
import PageContent from '@/components/layout/PageContent';
import { fetchProfessionnels } from '@/services/professionnels/professionnelService';
import { fetchAvailableLocales, fetchGlobal } from '@/services/globals/globalsServices';
import { NextSeo } from 'next-seo';
import { buildSeo } from '@/lib/seo';
import { StrapiPageData, StrapiGlobal } from '@/types';

export const getStaticPaths = async () => {
  const langs = await getBuildLocales();
  return {
    paths: langs.map((lang) => ({ params: { lang } })),
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }: { params: { lang: string } }) => {
  const locale = params.lang;
  const [professionnelsRes, globalRes, availableLocales] = await Promise.all([
    fetchProfessionnels({ locale }),
    fetchGlobal({ locale }),
    fetchAvailableLocales(),
  ]);

  if (!professionnelsRes.data || !globalRes.data || !globalRes.data.logo_extensed) {
    return { notFound: true };
  }

  return {
    props: {
      professionnels: professionnelsRes.data,
      global: globalRes.data,
      lang: locale,
      availableLocales,
    },
    revalidate: 3600,
  };
};

export default function Professionnels({
  professionnels,
  global,
  lang,
  availableLocales,
}: {
  professionnels: StrapiPageData;
  global?: StrapiGlobal;
  lang: string;
  availableLocales: string[];
}) {
  const renderedBlocks = BlockRenderer({ blocks: professionnels.blocks });

  return (
    <>
      <NextSeo
        {...buildSeo({
          seo: professionnels.seo,
          lang,
          basePath: "professionnels",
          fallbackTitle: "Professionnels",
          fallbackDescription: professionnels.description,
        })}
      />
      {renderedBlocks.heroSection}
      <PageContent global={global} lang={lang} availableLocales={availableLocales}>
        {renderedBlocks.otherBlocks}
      </PageContent>
    </>
  );
}
