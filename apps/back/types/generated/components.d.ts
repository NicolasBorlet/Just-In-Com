import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksCitation extends Struct.ComponentSchema {
  collectionName: 'components_blocks_citations';
  info: {
    description: '';
    displayName: 'Quote';
  };
  attributes: {
    content: Schema.Attribute.RichText;
  };
}

export interface BlocksContentSection extends Struct.ComponentSchema {
  collectionName: 'components_blocks_content_sections';
  info: {
    description: '';
    displayName: 'Content Section';
  };
  attributes: {
    cta: Schema.Attribute.Component<'elements.link', false>;
    description: Schema.Attribute.Text;
    gallerie: Schema.Attribute.Media<'images' | 'files' | 'videos', true>;
    horizontal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_blocks_hero_sections';
  info: {
    displayName: 'Hero Section';
  };
  attributes: {
    heading: Schema.Attribute.String;
    video: Schema.Attribute.Media<'files' | 'videos'>;
  };
}

export interface BlocksImageText extends Struct.ComponentSchema {
  collectionName: 'components_blocks_image_texts';
  info: {
    description: '';
    displayName: 'image - text';
  };
  attributes: {
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos'> &
      Schema.Attribute.Required;
    reversed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    Texte: Schema.Attribute.Component<'elements.text-box', false> &
      Schema.Attribute.Required;
  };
}

export interface BlocksInfoBlock extends Struct.ComponentSchema {
  collectionName: 'components_blocks_info_blocks';
  info: {
    displayName: 'Info Block';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    cta: Schema.Attribute.Component<'elements.link', false>;
    headline: Schema.Attribute.String;
    image: Schema.Attribute.Media<'files' | 'images'>;
    reversed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

export interface BlocksNavigation extends Struct.ComponentSchema {
  collectionName: 'components_blocks_navigations';
  info: {
    description: '';
    displayName: 'navigation';
  };
  attributes: {
    item: Schema.Attribute.Component<'elements.link', true>;
    name: Schema.Attribute.String;
  };
}

export interface BlocksServices extends Struct.ComponentSchema {
  collectionName: 'components_blocks_services';
  info: {
    description: '';
    displayName: 'Services Block';
  };
  attributes: {
    Services: Schema.Attribute.RichText;
  };
}

export interface BlocksWeddingBlock extends Struct.ComponentSchema {
  collectionName: 'components_blocks_wedding_blocks';
  info: {
    description: '';
    displayName: 'Wedding Block';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    link: Schema.Attribute.Text;
    married: Schema.Attribute.Component<'elements.married-item', true>;
    miniature: Schema.Attribute.Media<'images' | 'files'>;
  };
}

export interface ElementsImage extends Struct.ComponentSchema {
  collectionName: 'components_elements_images';
  info: {
    displayName: 'image';
  };
  attributes: {
    alt: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files'>;
  };
}

export interface ElementsLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    href: Schema.Attribute.String;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    text: Schema.Attribute.String;
  };
}

export interface ElementsLogo extends Struct.ComponentSchema {
  collectionName: 'components_elements_logos';
  info: {
    displayName: 'Logo';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files'>;
    logoText: Schema.Attribute.String;
  };
}

export interface ElementsMarriedItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_married_items';
  info: {
    description: '';
    displayName: 'Married Item';
  };
  attributes: {
    Name: Schema.Attribute.String;
  };
}

export interface ElementsTextBox extends Struct.ComponentSchema {
  collectionName: 'components_elements_text_boxes';
  info: {
    displayName: 'text-box';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    title: Schema.Attribute.String;
  };
}

export interface LayoutFooter extends Struct.ComponentSchema {
  collectionName: 'components_layout_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    detailled_logo: Schema.Attribute.Component<'elements.logo', false>;
    logo: Schema.Attribute.Component<'elements.logo', false>;
    navigation: Schema.Attribute.Component<'elements.link', true>;
    secondary_navigation: Schema.Attribute.Component<'elements.link', true>;
  };
}

export interface LayoutHeader extends Struct.ComponentSchema {
  collectionName: 'components_layout_headers';
  info: {
    description: '';
    displayName: 'Header';
  };
  attributes: {
    detailled_logo: Schema.Attribute.Component<'elements.logo', false>;
    logo: Schema.Attribute.Component<'elements.logo', false>;
    navigation: Schema.Attribute.Component<'elements.link', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.citation': BlocksCitation;
      'blocks.content-section': BlocksContentSection;
      'blocks.hero-section': BlocksHeroSection;
      'blocks.image-text': BlocksImageText;
      'blocks.info-block': BlocksInfoBlock;
      'blocks.navigation': BlocksNavigation;
      'blocks.services': BlocksServices;
      'blocks.wedding-block': BlocksWeddingBlock;
      'elements.image': ElementsImage;
      'elements.link': ElementsLink;
      'elements.logo': ElementsLogo;
      'elements.married-item': ElementsMarriedItem;
      'elements.text-box': ElementsTextBox;
      'layout.footer': LayoutFooter;
      'layout.header': LayoutHeader;
    }
  }
}
