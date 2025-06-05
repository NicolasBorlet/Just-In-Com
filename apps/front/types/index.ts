export interface Media {
  url: string;
  alternativeText?: string;
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

export interface InfoBlockBlock {
  __component: "blocks.info-block";
  id: number;
  headline: string;
  content: string;
  reversed: boolean;
  image: Media;
  cta: {
    id: number;
    href: string;
    text: string;
    isExternal: boolean;
  };
}

export interface InfoBlockProps {
  block: InfoBlockBlock;
}

export interface HeroSectionProps {
  block: HeroSectionBlock;
}

export interface HomePageData {
  data: {
    id: number;
    title: string;
    description: string;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    blocks: HeroSectionBlock[] | InfoBlockBlock[];
  };
  meta: Record<string, unknown>;
}
