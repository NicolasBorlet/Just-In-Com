import { getBlog } from "@/data/loaders";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const metadata = await getBlog();
    console.log("metadata", metadata);
    return {
      title: {
        default: metadata.data.title,
        template: '%s | ' + metadata.data.title
      },
      description: metadata.data.description,
    };
  }

export default async function BlogLayout({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
}
