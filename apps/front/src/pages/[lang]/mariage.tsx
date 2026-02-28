import { Wedding } from '@/types/wedding';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import { supportedLanguages } from '@/config/language';
import PageContent from '@/components/layout/PageContent';
import { fetchWeddings } from '@/services/weddings/weddingService';
import { fetchAvailableLocales, fetchGlobal } from '@/services/globals/globalsServices';
import { NextSeo } from 'next-seo';
import { getLocalizedPath } from '@/lib/i18n';
import { StrapiGlobal } from '@/types';

export const getStaticPaths = async () => {
  return {
    paths: supportedLanguages.map((lang) => ({ params: { lang } })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: { params: { lang: string } }) => {
  const locale = params.lang;
  const [weddingRes, globalRes, availableLocales] = await Promise.all([
    fetchWeddings({ locale }),
    fetchGlobal({ locale }),
    fetchAvailableLocales(),
  ]);
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
  const weddingData = wedding as Wedding & { seo?: { metaTitle?: string; metaDescription?: string } };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://justincom.fr";

  return (
    <>
      <NextSeo
        title={weddingData.seo?.metaTitle || "Mariage"}
        description={weddingData.seo?.metaDescription || ""}
        canonical={`${siteUrl}${getLocalizedPath("mariage", lang)}`}
      />
      {renderedBlocks.heroSection}
      <PageContent global={global} lang={lang} availableLocales={availableLocales}>
        {renderedBlocks.otherBlocks}
      </PageContent>
    </>
  );
}
