import { getEntreprise } from "@/data/loaders";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const metadata = await getEntreprise();
    return {
      title: {
        default: metadata.data.title,
        template: '%s | ' + metadata.data.title
      },
      description: metadata.data.description,
    };
  }

export default async function EntrepriseLayout({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
}
