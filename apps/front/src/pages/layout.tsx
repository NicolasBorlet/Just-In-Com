import { Baloo_2, Italiana } from "next/font/google";
import { notFound } from 'next/navigation';

// Define supported locales
type Locale = 'fr' | 'en' | 'es';
const locales: Locale[] = ['fr', 'en', 'es'];

// Font configurations
const baloo2 = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
});

const italiana = Italiana({
  variable: "--font-italiana",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: "400",
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});

// Generate static params for static generation
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// Set revalidation time (optional)
export const revalidate = 3600; // Revalidate every hour

// Metadata for the page
// export async function generateMetadata({
//   params,
// }: {
//   params: { lang: Locale };
// }) {
//   return {
//     title: {
//       default: 'Just in Com',
//       template: '%s | Just in Com',
//     },
//     description: 'Your website description',
//   };
// }

export default function RootLayout({
  children,
  // params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  // Validate that the incoming `locale` parameter is valid
  // if (!locales.includes(lang)) notFound();

  return (
    <html className={`${baloo2.variable} ${italiana.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}