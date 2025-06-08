'use client'

import ContentSection from "@/components/blocks/ContentSection";
import HeroSection from "@/components/blocks/HeroSection";
import InfoBlock from "@/components/blocks/InfoBlock";
import QuoteBlock from "@/components/blocks/QuoteBlock";
import PageContent from "@/components/globals/PageContent";
import { HomePageData } from "@/types";

interface HomePageProps {
  data: HomePageData;
}

export default function HomePage({ data }: HomePageProps) {
  const heroSection = data.data.blocks.find(block => block.__component === "blocks.hero-section");
  const otherBlocks = data.data.blocks.filter(block => block.__component !== "blocks.hero-section");

  console.log('otherBlocks', otherBlocks);
  console.log('heroSection', heroSection);

  return (
    <div className="flex flex-col gap-24">
      {heroSection && <HeroSection key={heroSection.id} block={heroSection} />}
      <PageContent>
        <div className="flex flex-col gap-24">
          {otherBlocks.map((block) => {
            if (block.__component === "blocks.info-block") {
              return <InfoBlock key={block.id} block={block} />;
            }
            if (block.__component === "blocks.citation") {
              return <QuoteBlock key={block.id} block={block} />;
            }
            if (block.__component === "blocks.content-section") {
              return <ContentSection key={block.id} block={block} />;
            }
            return null;
          })}
        </div>
      </PageContent>
    </div>
  );
}
