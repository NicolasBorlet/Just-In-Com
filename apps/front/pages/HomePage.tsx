'use client'

import HeroSection from "@/components/blocks/HeroSection";
import InfoBlock from "@/components/blocks/InfoBlock";
import PageContent from "@/components/globals/PageContent";
import { HomePageData } from "@/types";

interface HomePageProps {
  data: HomePageData;
}

export default function HomePage({ data }: HomePageProps) {
  return (
    <div className="flex flex-col gap-24">
        {data.data.blocks.map((block) => {
        if (block.__component === "blocks.hero-section") {
          return <HeroSection key={block.id} block={block} />;
        }
        return null;
      })}
    <PageContent>
        {data.data.blocks.map((block) => {
        if (block.__component === "blocks.info-block") {
          return <InfoBlock key={block.id} block={block} />;
        }
        return null;
      })}
    </PageContent>
    </div>
  );
}
