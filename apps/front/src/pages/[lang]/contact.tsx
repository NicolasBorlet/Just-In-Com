import BlockRenderer from '@/components/blocks/BlockRenderer';
import { getBuildLocales } from '@/config/language';
import PageContent from '@/components/layout/PageContent';
import { fetchContact } from '@/services/contact/contactService';
import { fetchAvailableLocales, fetchGlobal } from '@/services/globals/globalsServices';
import ContactForm from '@/components/elements/ContactForm/ContactForm';
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
  const [contactRes, globalRes, availableLocales] = await Promise.all([
    fetchContact({ locale }),
    fetchGlobal({ locale }),
    fetchAvailableLocales(),
  ]);

  if (!contactRes.data || !globalRes.data) {
    return { notFound: true };
  }

  return {
    props: {
      contact: contactRes.data,
      global: globalRes.data,
      lang: locale,
      availableLocales,
    },
    revalidate: 3600,
  };
};

export default function Contact({
  contact,
  global,
  lang,
  availableLocales,
}: {
  contact: StrapiPageData;
  global?: StrapiGlobal;
  lang: string;
  availableLocales: string[];
}) {
  const renderedBlocks = BlockRenderer({ blocks: contact.blocks });

  return (
    <>
      <NextSeo
        {...buildSeo({
          seo: contact.seo,
          lang,
          basePath: "contact",
          fallbackTitle: "Contact",
          fallbackDescription: contact.description,
        })}
      />
      {renderedBlocks.heroSection}
      <PageContent global={global} lang={lang} availableLocales={availableLocales}>
        <div className="flex flex-col gap-12 md:gap-24">
          <div className="max-w-2xl mx-auto w-full text-quaternary text-lg">
            <p className="mb-24 text-center">
              {contact.description || 'Pour toute demande ou pour une demande de devis, vous pouvez remplir le formulaire ci-dessous. Je vous réponds dans les plus bref délais.'}
            </p>
            <ContactForm />
          </div>
        </div>
      </PageContent>
    </>
  );
}
