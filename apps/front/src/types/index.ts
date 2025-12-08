export interface BlogType {
  id: number;
  title: string;
  content: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface HeroSectionBlock {
  __component: "blocks.hero-section";
  id: number;
  heading: string;
  video: {
    id: number;
    documentId: string;
    url: string;
  };
}

// Import block types
import { WeddingSectionBlock } from "@/components/blocks/WeddingSection/WeddingSection.type";
import { InfoBlockBlock } from "@/components/blocks/InfoBlock/InfoBlock.type";
import { ContentSection } from "@/components/blocks/ContentSection/ContentSection.type";
import { QuoteBlock } from "@/components/blocks/QuoteBlock/QuoteBlock.type";
import { ServicesBlock } from "@/components/blocks/ServicesBlock/ServicesBlock.type";
import { LinkBlock } from "@/components/elements/LinkBlock/LinkBlock.type";

// Union type for all blocks
export type Block =
  | HeroSectionBlock
  | WeddingSectionBlock
  | InfoBlockBlock
  | ContentSection
  | QuoteBlock
  | ServicesBlock
  | LinkBlock;


export interface BlockRendererProps {
  blocks: Block[];
}

export interface Media {
  url: string;
  alternativeText?: string;
  documentId: string;
  id: number;
}