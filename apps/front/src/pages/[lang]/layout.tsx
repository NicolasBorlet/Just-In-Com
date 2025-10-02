export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'de' }, { lang: 'fr' }];
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { lang: 'en' | 'de' | 'fr' }
}>) {
    const lang = params?.lang ?? 'en';

  // You can use global data here, e.g. data.data.attributes
  return (
    <html lang={lang}>
      <body>
        {children}
      </body>
    </html>
  );
}