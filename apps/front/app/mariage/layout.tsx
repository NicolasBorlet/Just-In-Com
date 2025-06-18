import { getMariage } from "@/data/loaders";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const metadata = await getMariage();
    return {
      title: {
        default: metadata.data.title,
        template: '%s | ' + metadata.data.title
      },
      description: metadata.data.description,
    };
  }

export default async function MariageLayout({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
}
