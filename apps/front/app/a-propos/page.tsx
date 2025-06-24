import { getAbout } from "@/data/loaders";
import ClientAboutPage from "@/components/wrappers/ClientAboutPage";
import { headers } from "next/headers";

export default async function About() {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language") || "";
  
  const preferredLanguage = acceptLanguage
    .split(",")[0]
    .split("-")[0]
    .toLowerCase();

  const locale = preferredLanguage === 'fr' ? 'fr' : 'en';
  
  try {
    const data = await getAbout(locale);
    
    return (
      <ClientAboutPage
        initialData={data}
        initialLocale={locale}
      />
    );
  } catch (error) {
    console.error('Failed to load about data:', error);
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Unable to load content</h1>
          <p>Please try refreshing the page.</p>
        </div>
      </main>
    );
  }
}
