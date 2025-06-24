import { getContact } from "@/data/loaders";
import ClientContactPage from "@/components/wrappers/ClientContactPage";
import { headers } from "next/headers";

export default async function Contact() {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language") || "";
  
  const preferredLanguage = acceptLanguage
    .split(",")[0]
    .split("-")[0]
    .toLowerCase();

  const locale = preferredLanguage === 'fr' ? 'fr' : 'en';
  
  try {
    const data = await getContact(locale);
    
    return (
      <ClientContactPage
        initialData={data}
        initialLocale={locale}
      />
    );
  } catch (error) {
    console.error('Failed to load contact data:', error);
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
