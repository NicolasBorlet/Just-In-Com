import BlockRenderer from "@/components/blocks/BlockRenderer";
import ContactCTA from "@/components/atoms/ContactCTA";
import { getBuildLocales } from "@/config/language";
import PageContent from "@/components/layout/PageContent";
import { fetchAbout } from "@/services/about/aboutService";
import { fetchAvailableLocales, fetchGlobal } from "@/services/globals/globalsServices";
import { NextSeo } from "next-seo";
import { buildSeo } from "@/lib/seo";
import { StrapiPageData, StrapiGlobal } from "@/types";

export const getStaticPaths = async () => {
  const langs = await getBuildLocales();
  return {
    paths: langs.map((lang) => ({ params: { lang } })),
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }: { params: { lang: string } }) => {
  const locale = params.lang;
  const [aboutRes, globalRes, availableLocales] = await Promise.all([
    fetchAbout({ locale }),
    fetchGlobal({ locale }),
    fetchAvailableLocales(),
  ]);

  if (!aboutRes.data || !globalRes.data) {
    return { notFound: true };
  }

  return {
    props: {
      about: aboutRes.data,
      global: globalRes.data,
      lang: locale,
      availableLocales,
    },
    revalidate: 3600,
  };
};

export default function About({
  about,
  global,
  lang,
  availableLocales,
}: {
  about: StrapiPageData;
  global?: StrapiGlobal;
  lang: string;
  availableLocales: string[];
}) {
  const renderedBlocks = BlockRenderer({
    blocks: about.blocks,
    compactMedia: true,
  });

  return (
    <>
      <NextSeo
        {...buildSeo({
          seo: about.seo,
          lang,
          basePath: "a-propos",
          fallbackTitle: "À propos",
          fallbackDescription: about.description,
        })}
      />
      {renderedBlocks.heroSection}
      <PageContent global={global} lang={lang} availableLocales={availableLocales}>
        {renderedBlocks.otherBlocks}
        {!about.blocks.some((b) => b.__component === "elements.link") && (
          <ContactCTA lang={lang} />
        )}
      </PageContent>
    </>
  );
}
