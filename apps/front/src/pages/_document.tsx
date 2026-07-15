import { Html, Head, Main, NextScript } from "next/document";
import type { DocumentContext, DocumentInitialProps } from "next/document";
import Document from "next/document";

const LOCALES = ["fr", "en", "de"] as const;

type Props = DocumentInitialProps & { lang: string };

export default function MyDocument({ lang }: Props) {
  return (
    <Html lang={lang}>
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx: DocumentContext): Promise<Props> => {
  const initialProps = await Document.getInitialProps(ctx);
  const asPath = ctx.asPath || ctx.pathname || "";
  const firstSegment = asPath.split("?")[0].split("/").filter(Boolean)[0];
  const lang = LOCALES.includes(firstSegment as (typeof LOCALES)[number])
    ? (firstSegment as string)
    : "fr";

  return { ...initialProps, lang };
};
