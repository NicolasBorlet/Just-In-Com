import { BlogType } from '@/types';
import React from 'react'
import { supportedLanguages } from '@/config/language'

export const getStaticPaths = async () => {
  return {
    paths: supportedLanguages.map(lang => ({ params: { lang } })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: { params: { lang: string } }) => {
  const resulting = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/blog`);
  const result = await resulting.json();
  return {
    props: {
      result: result.data,
      lang: params.lang,
    },
  };
};

export default function Blog({ result, lang }: { result: BlogType, lang: string }) {
  return (
    <div>
      <h1>{result.title}, {lang}</h1>
    </div>
  )
}
