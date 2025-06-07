export interface Media {
  url: string;
  alternativeText?: string;
}

export interface Link {
  id: number;
  text: string;
  href: string;
  isExternal: boolean;
}

export interface Logo {
  id: number;
  logoText: string;
  image: Media;
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

export interface EntreprisePageData {
  data: {
    id: number;
    title: string;
    description: string;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    blocks: (HeroSectionBlock | TextBlock | ImageBlock)[];
  };
  meta: Record<string, unknown>;
}

export interface ContactPageData {
  data: {
    id: number;
    title: string;
    description: string;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    blocks: (HeroSectionBlock)[];
  };
  meta: Record<string, unknown>;
}

export interface MariagePageData {
    data: {
        id: number;
        title: string;
        description: string;
        documentId: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        blocks: (HeroSectionBlock)[];
      };
      meta: Record<string, unknown>;
}

export interface AboutPageData {
    data: {
        id: number;
        title: string;
        description: string;
        documentId: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        blocks: (HeroSectionBlock)[];
      };
      meta: Record<string, unknown>;
}

export interface BlogPageData {
    data: {
        id: number;
        title: string;
        description: string;
        documentId: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        blocks: (HeroSectionBlock)[];
        cover: Media;
        category: {
            id: number;
            name: string;
        };
    };
}

export interface Article {
    cover: Media;
    id: number;
    title: string;
    description: string;
    content: string;
    slug: string;
    category: {
        id: number;
        name: string;
    };
}

export interface TextBlock {
  __component: "elements.text-box";
  id: number;
  title?: string;
  content?: string;
}

export interface TextBlockProps {
  block: TextBlock;
}

export interface ImageBlock {
  __component: "elements.image";
  id: number;
  image: Media;
}

export interface ImageBlockProps {
  block: ImageBlock;
}

export interface HeaderBlock {
  __component: "layout.header";
  id: number;
  logo: Logo;
  detailled_logo: Logo;
  navigation: Link[];
}

export interface FooterBlock {
  __component: "layout.footer";
  id: number;
  logo: Logo;
  detailled_logo: Logo;
  navigation: Link[];
  secondary_navigation: Link[];
  cta: Link;
}

export interface GlobalSettings {
  title: string;
  description: string;
  header: HeaderBlock;
  footer: FooterBlock;
  social_links: Link[];
}
