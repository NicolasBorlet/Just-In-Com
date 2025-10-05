import { BlockRendererProps } from "@/types";
import HeroSection from "./HeroSection/HeroSection";

const BlockRenderer: React.FC<BlockRendererProps> = ({ blocks }) => {
  return (
    <>
      {blocks.map((block) => {
        switch (block.__component) {
          case 'blocks.hero-section':
            return <HeroSection key={block.id} block={block} />;
          case 'blocks.wedding-block':
            return <p>wedding section</p>;
          default:
            return null;
        }
      })}
    </>
  );
};

export default BlockRenderer;