import BlockRenderer from '@/components/blocks/BlockRenderer';
import { supportedLanguages } from '@/config/language';
import PageContent from '@/components/layout/PageContent';
import { fetchContact } from '@/services/contact/contactService';
import { fetchAvailableLocales, fetchGlobal } from '@/services/globals/globalsServices';
import ContactForm from '@/components/elements/ContactForm/ContactForm';
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
  const [contactRes, globalRes, availableLocales] = await Promise.all([
    fetchContact({ locale }),
    fetchGlobal({ locale }),
    fetchAvailableLocales(),
  ]);

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
  contact: any;
  global?: any;
  lang: string;
  availableLocales: string[];
}) {
  const renderedBlocks = BlockRenderer({ blocks: contact.blocks });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://justincom.fr";

  return (
    <>
      <NextSeo
        title={contact.seo?.metaTitle || "Contact"}
        description={contact.seo?.metaDescription || ""}
        canonical={`${siteUrl}${getLocalizedPath("contact", lang)}`}
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
