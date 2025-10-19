import { BlockRendererProps } from "@/types";
import HeroSection from "./HeroSection/HeroSection";
import WeddingSection from "./WeddingSection/WeddingSection";
import InfoBlock from "./InfoBlock/InfoBlock";
import ContentSection from "./ContentSection/ContentSection";
import QuoteBlock from "./QuoteBlock/QuoteBlock";

const BlockRenderer: React.FC<BlockRendererProps> = ({ blocks }) => {
  return (
    <>
      {blocks.map((block) => {
        switch (block.__component) {
          case 'blocks.hero-section':
            return <HeroSection key={block.id} block={block} />;
          case 'blocks.wedding-block':
            return <WeddingSection key={block.id} block={block} />;
          case 'blocks.info-block':
            // return <InfoBlock key={block.id} block={block} />;
            return <InfoBlock key={block.id} block={block} />;
          case 'blocks.content-section':
            // return <InfoBlock key={block.id} block={block} />;
            return <ContentSection key={block.id} block={block} />;
          case 'blocks.citation':
            // return <InfoBlock key={block.id} block={block} />;
            return <QuoteBlock key={block.id} block={block} />;
          default:
            return null;
        }
      })}
    </>
  );
};

export default BlockRenderer;
