import { getMariage } from "@/data/loaders";
import ClientMariagePage from "@/components/wrappers/ClientMariagePage";

export const revalidate = 3600; // Revalidate every hour

export default async function Mariage() {
  const locale = 'fr'; // Default locale for SSG
  
  try {
    const data = await getMariage(locale);
    
    return (
      <ClientMariagePage
        initialData={data}
        initialLocale={locale}
      />
    );
  } catch (error) {
    console.error('Failed to load mariage data:', error);
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
