import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preconnect to Google fonts for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Load Baloo 2 and Italiana (display=swap) */}
        <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;700" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Italiana&display=swap" rel="stylesheet"/>
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
