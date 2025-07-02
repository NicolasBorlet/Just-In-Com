import { getEntreprise } from "@/data/loaders";
import ClientEntreprisePage from "@/components/wrappers/ClientEntreprisePage";

export const revalidate = 3600; // Revalidate every hour

export default async function Entreprise() {
  const locale = 'fr'; // Default locale for SSG
  
  try {
    const data = await getEntreprise(locale);
    
    return (
      <ClientEntreprisePage
        initialData={data}
        initialLocale={locale}
      />
    );
  } catch (error) {
    console.error('Failed to load entreprise data:', error);
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
