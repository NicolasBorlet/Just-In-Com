import { supportedLanguages } from '@/config/language';
import { BlogType } from '@/types';
import React from 'react'

export const getStaticPaths = async () => {
  return {
    paths: supportedLanguages.map(lang => ({ params: { lang } })),
    fallback: false,
  };
};

export const getStaticProps = async () => {
  const resulting = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/blog`);
  const result = await resulting.json();
  return {
    props: {
      result: result.data,
    },
  };
};

export default function About({ result }: { result: BlogType }) {
  return (
    <div>{result.title}</div>
  )
}
