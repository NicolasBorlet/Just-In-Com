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

export type Block = {
  __component: string;
  id: number;
  [key: string]: any;
};

export interface BlockRendererProps {
  blocks: Block[];
}

export interface Media {
  url: string;
  alternativeText?: string;
  documentId: string;
  id: number;
}