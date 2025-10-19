import { Media } from "@/types";

interface ContentSection {
    __component: "blocks.content-section";
    id: number;
    title: string;
    description: string;
    gallerie: Media[];
    cta: {
        id: number;
        href: string;
        text: string;
        isExternal: boolean;
    };
    horizontal: boolean;
    grid: boolean;
}

export interface ContentSectionProps {
  block: ContentSection;
}