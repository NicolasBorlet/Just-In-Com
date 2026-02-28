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
import TextBlockType from "@/components/elements/TextBlock/TextBlock.type";
import ImageTextType from "@/components/elements/ImageText/ImageText.type";

// Union type for all blocks
export type Block =
  | HeroSectionBlock
  | WeddingSectionBlock
  | InfoBlockBlock
  | ContentSection
  | QuoteBlock
  | ServicesBlock
  | LinkBlock
  | TextBlockType
  | ImageTextType;

export interface BlockRendererProps {
  blocks: Block[];
}

export interface Media {
  url: string;
  alternativeText?: string;
  documentId: string;
  id: number;
}

export interface MenuItem {
  id: number;
  text: string;
  href: string;
  isExternal?: boolean;
}

export interface Menu {
  name: string;
  item: MenuItem[];
}

export interface StrapiImage {
  url: string;
  alternativeText?: string;
}

export interface StrapiLogo {
  image: StrapiImage;
  logoText?: string;
}

export interface StrapiGlobal {
  logo: StrapiLogo;
  logo_extensed: StrapiLogo;
  menu: Menu[];
}

export interface StrapiSeo {
  metaTitle?: string;
  metaDescription?: string;
}

export interface StrapiPageData {
  blocks: Block[];
  seo?: StrapiSeo;
  description?: string;
}

export interface StrapiArticle {
  id: number;
  title: string;
  description?: string;
  slug: string;
  cover?: StrapiImage;
  publishedAt?: string;
  createdAt: string;
  updatedAt?: string;
  seo?: StrapiSeo;
}