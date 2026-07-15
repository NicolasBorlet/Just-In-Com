import { BlockRendererProps } from "@/types";
import HeroSection from "./HeroSection/HeroSection";
import WeddingSection from "./WeddingSection/WeddingSection";
import InfoBlock from "./InfoBlock/InfoBlock";
import ContentSection from "./ContentSection/ContentSection";
import QuoteBlock from "./QuoteBlock/QuoteBlock";
import { ReactNode } from "react";
import ServicesBlock from "./ServicesBlock/ServicesBlock";
import LinkBlock from "../elements/LinkBlock/LinkBlock";
import TextBlock from "../elements/TextBlock/TextBlock";
import ImageText from "../elements/ImageText/ImageText";

interface BlockRendererResult {
  heroSection: ReactNode | null;
  otherBlocks: ReactNode[];
}

const BlockRenderer = ({ blocks, isHome = false }: BlockRendererProps): BlockRendererResult => {
  const result: BlockRendererResult = {
    heroSection: null,
    otherBlocks: []
  };

  blocks.forEach((block) => {
    const key = block.id;

    switch (block.__component) {
      case 'blocks.hero-section':
        result.heroSection = <HeroSection key={key} block={block} isHome={isHome} />;
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
      case 'blocks.services':
        result.otherBlocks.push(<ServicesBlock key={key} block={block} />);
        break;
      case 'blocks.image-text':
        result.otherBlocks.push(<ImageText key={key} block={block} />);
        break;
      case 'elements.link':
        result.otherBlocks.push(<LinkBlock key={key} block={block} />);
        break;
      case 'elements.text-box':
        result.otherBlocks.push(<TextBlock key={key} block={block} />);
        break;
    }
  });

  return result;
};

export default BlockRenderer;
