import { getContact } from "@/data/loaders";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const metadata = await getContact();
    console.log("metadata", metadata);
    return {
      title: {
        default: metadata.data.title,
        template: '%s | ' + metadata.data.title
      },
      description: metadata.data.description,
    };
  }

export default async function ContactLayout({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
}
