import { BlockRendererProps } from "@/types";
import HeroSection from "./HeroSection/HeroSection";
import WeddingSection from "./WeddingSection/WeddingSection";
import InfoBlock from "./InfoBlock/InfoBlock";

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
            return <h1>Content section</h1>
          case 'blocks.citation':
            // return <InfoBlock key={block.id} block={block} />;
            return <h1>Citation</h1>
          default:
            return null;
        }
      })}
    </>
  );
};

export default BlockRenderer;
