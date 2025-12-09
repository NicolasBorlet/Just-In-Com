export interface LinkBlock {
    __component: "elements.link";
    id: number;
    text: string;
    href: string | null;
    isExternal: boolean;
}