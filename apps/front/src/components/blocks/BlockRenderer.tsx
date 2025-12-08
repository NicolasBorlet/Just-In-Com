import { BlockRendererProps } from "@/types";
import HeroSection from "./HeroSection/HeroSection";
import WeddingSection from "./WeddingSection/WeddingSection";
import InfoBlock from "./InfoBlock/InfoBlock";
import ContentSection from "./ContentSection/ContentSection";
import QuoteBlock from "./QuoteBlock/QuoteBlock";
import { ReactNode } from "react";

interface BlockRendererResult {
  heroSection: ReactNode | null;
  otherBlocks: ReactNode[];
}

const BlockRenderer: React.FC<BlockRendererProps> = ({ blocks }) => {
  const result: BlockRendererResult = {
    heroSection: null,
    otherBlocks: []
  };

  blocks.forEach((block) => {
    const key = block.id;

    switch (block.__component) {
      case 'blocks.hero-section':
        result.heroSection = <HeroSection key={key} block={block} />;
        break;
      case 'blocks.wedding-block':
        result.otherBlocks.push(<WeddingSection key={key} block={block} />);
        break;
      case 'blocks.info-block':
        result.otherBlocks.push(<InfoBlock key={key} block={block} />);
        break;
      case 'blocks.content-section':
        result.otherBlocks.push(<ContentSection key={key} block={block} />);
        break;
      case 'blocks.citation':
        result.otherBlocks.push(<QuoteBlock key={key} block={block} />);
        break;
    }
  });

  return (
    <>
      {result.heroSection}
      {result.otherBlocks}
    </>
  );
};

export default BlockRenderer;
