import { Media } from "@/types";

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