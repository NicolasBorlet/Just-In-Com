import { Wedding } from '@/types/wedding';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import WeddingSection from '@/components/blocks/WeddingSection/WeddingSection';
import { WeddingSectionBlock } from '@/components/blocks/WeddingSection/WeddingSection.type';
import ContactCTA from '@/components/atoms/ContactCTA';
import { getBuildLocales } from '@/config/language';
import PageContent from '@/components/layout/PageContent';
import { fetchWeddings } from '@/services/weddings/weddingService';
import { fetchAvailableLocales, fetchGlobal } from '@/services/globals/globalsServices';
import { NextSeo } from 'next-seo';
import { buildSeo } from '@/lib/seo';
import { Block, StrapiGlobal } from '@/types';

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

  if (!weddingRes.data || !globalRes.data) {
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

const introCopy: Record<string, { title: string; text: string }> = {
  fr: {
    title: "Des films qui racontent votre histoire",
    text: "Chaque mariage est unique. Je capture l’émotion, les regards et les détails pour créer un film intime et cinématographique qui vous ressemble.",
  },
  en: {
    title: "Films that tell your story",
    text: "Every wedding is unique. I capture emotion, glances and details to create an intimate, cinematic film that feels like you.",
  },
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
  const blocks = wedding.blocks as Block[];
  const weddingFilms = blocks.filter(
    (b): b is WeddingSectionBlock => b.__component === "blocks.wedding-block"
  );
  const beforeFilms = blocks.filter(
    (b) =>
      b.__component !== "blocks.wedding-block" &&
      b.__component !== "blocks.services" &&
      b.__component !== "elements.link"
  );
  const afterFilms = blocks.filter(
    (b) => b.__component === "blocks.services" || b.__component === "elements.link"
  );

  const hasTextIntro = beforeFilms.some((b) => b.__component === "elements.text-box");
  const introBlocks = BlockRenderer({ blocks: beforeFilms });
  const afterBlocks = BlockRenderer({ blocks: afterFilms });
  const weddingData = wedding as Wedding & { seo?: import("@/types").StrapiSeo };
  const intro = introCopy[lang] || introCopy.fr;

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
      {introBlocks.heroSection}
      <PageContent global={global} lang={lang} availableLocales={availableLocales}>
        {!hasTextIntro && (
          <div className="flex flex-col gap-4 max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-special">{intro.title}</h2>
            <p className="text-lg text-[#3B1621]/80">{intro.text}</p>
          </div>
        )}
        {introBlocks.otherBlocks}
        {weddingFilms.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {weddingFilms.map((block) => (
              <WeddingSection key={block.id} block={block} compact />
            ))}
          </div>
        )}
        {afterBlocks.otherBlocks}
        {!afterFilms.some((b) => b.__component === "elements.link") && (
          <ContactCTA lang={lang} />
        )}
      </PageContent>
    </>
  );
}
