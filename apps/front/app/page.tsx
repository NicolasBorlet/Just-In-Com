import ClientHomePage from "@/components/ClientHomePage";
import { getAccueil } from "@/data/loaders";

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const locale = 'fr'; // Default locale for SSG
  
  try {
    const data = await getAccueil(locale);
    
    return <ClientHomePage initialData={data} initialLocale={locale} />;
  } catch (error) {
    console.error('Failed to load homepage data:', error);
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
