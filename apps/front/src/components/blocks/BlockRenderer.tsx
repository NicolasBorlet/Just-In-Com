import { Block, BlockRendererProps } from "@/types";
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

function sectionKind(block: Block): "mariage" | "pro" | "about" | "other" {
  const title =
    ("title" in block && typeof block.title === "string" && block.title) ||
    ("headline" in block && typeof block.headline === "string" && block.headline) ||
    ("Texte" in block && block.Texte?.title) ||
    "";
  const t = title.toLowerCase();
  if (/mariage|wedding|film/.test(t)) return "mariage";
  if (/pro|entreprise|professionnel|corporate|business/.test(t)) return "pro";
  if (/qui|propos|about|suis/.test(t)) return "about";
  return "other";
}

const BlockRenderer = ({
  blocks,
  isHome = false,
  compactMedia = false,
  autoplayVideos = false,
}: BlockRendererProps & { compactMedia?: boolean; autoplayVideos?: boolean }): BlockRendererResult => {
  const result: BlockRendererResult = {
    heroSection: null,
    otherBlocks: []
  };

  const ordered = isHome
    ? [...blocks].sort((a, b) => {
        const order = { mariage: 0, pro: 1, about: 2, other: 3 } as const;
        return order[sectionKind(a)] - order[sectionKind(b)];
      })
    : blocks;

  const pushBlock = (block: Block, key: number) => {
    switch (block.__component) {
      case 'blocks.hero-section':
        result.heroSection = <HeroSection key={key} block={block} isHome={isHome} />;
        break;
      case 'blocks.wedding-block':
        result.otherBlocks.push(<WeddingSection key={key} block={block} compact />);
        break;
      case 'blocks.info-block':
        result.otherBlocks.push(<InfoBlock key={key} block={block} compact={compactMedia} />);
        break;
      case 'blocks.content-section': {
        const kind = sectionKind(block);
        const autoplay = autoplayVideos || (isHome && (kind === "mariage" || kind === "pro"));
        const parallax = isHome && kind === "pro";
        result.otherBlocks.push(
          <ContentSection
            key={key}
            block={block}
            autoplayWithSound={autoplay}
            parallax={parallax}
          />
        );
        break;
      }
      case 'blocks.citation':
        result.otherBlocks.push(<QuoteBlock key={key} block={block} />);
        break;
      case 'blocks.services':
        result.otherBlocks.push(<ServicesBlock key={key} block={block} />);
        break;
      case 'blocks.image-text':
        result.otherBlocks.push(
          <ImageText
            key={key}
            block={block}
            compactMedia={compactMedia || isHome}
            parallax={isHome || autoplayVideos}
          />
        );
        break;
      case 'elements.link':
        result.otherBlocks.push(<LinkBlock key={key} block={block} />);
        break;
      case 'elements.text-box':
        result.otherBlocks.push(<TextBlock key={key} block={block} />);
        break;
    }
  };

  ordered.forEach((block) => pushBlock(block, block.id));

  return result;
};

export default BlockRenderer;
