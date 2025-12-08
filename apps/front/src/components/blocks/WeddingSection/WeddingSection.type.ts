interface MarriedPerson {
  id: string;
  name: string;
}

interface Miniature {
  id: string;
  url: string;
  formats: {
    small: {
      url: string;
    }
    medium: {
      url: string;
    }
    large: {
      url: string;
    }
    thumbnail: {
      url: string;
    }
  }
}

export interface WeddingSectionBlock {
  __component: "blocks.wedding-block";
  id: number;
  description: string;
  link: string;
  married: MarriedPerson[];
  miniature: Miniature;
}

export interface WeddingSectionBlockProps {
  block: WeddingSectionBlock;
}
