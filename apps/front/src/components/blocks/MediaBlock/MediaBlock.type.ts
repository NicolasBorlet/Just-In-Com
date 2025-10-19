export interface MediaBlock {
  id: number;
  __component: "elements.media";
  media: {
    url: string;
    alternativeText?: string;
    mime?: string;
  };
}
