import HeroSection from "@/components/blocks/HeroSection";
import PageContent from "@/components/globals/PageContent";
import { EntreprisePageData } from "@/types";

interface EntreprisePageProps {
    data: EntreprisePageData;
}

export default function EntreprisePage({ data }: EntreprisePageProps) {
    return     <div className="flex flex-col gap-24">
    {data.data.blocks.map((block) => {
    if (block.__component === "blocks.hero-section") {
      return <HeroSection key={block.id} block={block} />;
    }
    return null;
  })}
        <PageContent>
            <h1 className="text-4xl font-bold">{data.data.title}</h1>
            <p className="text-lg">{data.data.description}</p>
        </PageContent>
    </div>;
}
