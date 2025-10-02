import { BlogType } from '@/types';
import React from 'react';
import { supportedLanguages } from '@/config/language';
import { Wedding } from '@/types/wedding';

export const getStaticPaths = async () => {
  return {
    paths: supportedLanguages.map(lang => ({ params: { lang } })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: { params: { lang: string } }) => {
  const blogRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/blog`);
  const blogJson = await blogRes.json();
  const weddingsRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/mariage?populate=*`);
  const weddingsJson = await weddingsRes.json();
  return {
    props: {
      result: blogJson.data,
      weddings: weddingsJson.data,
      lang: params.lang,
    },
  };
};

export default function Blog({ result, weddings, lang }: { result: BlogType, weddings: Wedding, lang: string }) {
  return (
    <div>
      <h1>{result.title}, {lang}, {weddings?.title}</h1>
    </div>
  );
}
