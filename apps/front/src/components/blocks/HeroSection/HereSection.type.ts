export interface HeroSectionBlock {
  __component: "blocks.hero-section";
  id: number;
  heading: string;
  video: {
    id: number;
    documentId: string;
    url: string;
  };
  poster?: {
    id: number;
    documentId: string;
    url: string;
    alternativeText?: string;
  };
}
export interface HeroSectionProps {
  block: HeroSectionBlock;
  isHome?: boolean;
}
