import BlockRenderer from '@/components/blocks/BlockRenderer';
import { supportedLanguages } from '@/config/language';
import PageContent from '@/components/layout/PageContent';
import { fetchProfessionnels } from '@/services/professionnels/professionnelService';
import { fetchAvailableLocales, fetchGlobal } from '@/services/globals/globalsServices';
import { NextSeo } from 'next-seo';
import { getLocalizedPath } from '@/lib/i18n';

export const getStaticPaths = async () => {
  return {
    paths: supportedLanguages.map((lang) => ({ params: { lang } })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: { params: { lang: string } }) => {
  const locale = params.lang;
  const [professionnelsRes, globalRes, availableLocales] = await Promise.all([
    fetchProfessionnels({ locale }),
    fetchGlobal({ locale }),
    fetchAvailableLocales(),
  ]);

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
  professionnels: any;
  global?: any;
  lang: string;
  availableLocales: string[];
}) {
  const renderedBlocks = BlockRenderer({ blocks: professionnels.blocks });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://justincom.fr";

  return (
    <>
      <NextSeo
        title={professionnels.seo?.metaTitle || "Professionnels"}
        description={professionnels.seo?.metaDescription || ""}
        canonical={`${siteUrl}${getLocalizedPath("professionnels", lang)}`}
      />
      {renderedBlocks.heroSection}
      <PageContent global={global} lang={lang} availableLocales={availableLocales}>
        {renderedBlocks.otherBlocks}
      </PageContent>
    </>
  );
}
