import { BlogType } from '@/types';
import React, { useEffect } from 'react';
import { supportedLanguages } from '@/config/language';
import { Wedding } from '@/types/wedding';
import BlockRenderer from '@/components/blocks/BlockRenderer';

export const getStaticPaths = async () => {
  return {
    paths: supportedLanguages.map(lang => ({ params: { lang } })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: { params: { lang: string } }) => {
  const blogRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/blog`);
  const blogJson = await blogRes.json();
  const weddingsRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/mariage?populate[blocks][populate]=*`);
  const weddingsJson = await weddingsRes.json();
  return {
    props: {
      result: blogJson.data,
      weddings: weddingsJson.data,
      lang: params.lang,
    },
  };
};

export default function Mariage({ result, weddings, lang }: { result: BlogType, weddings: Wedding, lang: string }) {

  useEffect(() => {
    console.log('Weddings data:', weddings);
  }, [weddings]);

  return (
    <div>
      <BlockRenderer blocks={weddings.blocks} />
    </div>
  );
}
