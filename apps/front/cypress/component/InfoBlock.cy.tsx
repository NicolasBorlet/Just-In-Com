import InfoBlock from '../../components/blocks/InfoBlock';

describe('InfoBlock Component', () => {
  const mockBlock = {
    __component: "blocks.info-block" as const,
    id: 1,
    headline: 'Test Headline',
    content: 'Test content with **bold** text',
    image: {
      url: '/test-image.jpg',
      alternativeText: 'Test image',
      documentId: 'test-document-id',
      id: 1
    },
    reversed: false,
    cta: {
      id: 1,
      text: 'Click me',
      href: '/test',
      isExternal: false
    }
  };

  it('renders with all elements', () => {
    cy.mount(<InfoBlock block={mockBlock} />);
    cy.get('h1').should('contain', 'Test Headline');
    cy.get('.prose strong').should('contain', 'bold');
    cy.get('img').should('have.attr', 'src').and('include', 'test-image.jpg');
    cy.get('img').should('have.attr', 'alt', 'Test image');
    cy.get('a').should('contain', 'Click me');
  });

  it('applies reversed layout when specified', () => {
    const reversedBlock = { ...mockBlock, reversed: true };
    cy.mount(<InfoBlock block={reversedBlock} />);
    cy.get('div.flex.flex-col.md\\:flex-row').should('have.class', 'md:flex-row-reverse');
  });

  it('applies default layout when not reversed', () => {
    cy.mount(<InfoBlock block={mockBlock} />);
    cy.get('div.flex.flex-col.md\\:flex-row').should('have.class', 'md:flex-row');
  });

  it('renders image with correct dimensions and classes', () => {
    cy.mount(<InfoBlock block={mockBlock} />);
    cy.get('img')
      .should('have.attr', 'width', '340')
      .and('have.attr', 'height', '500')
      .and('have.class', 'object-cover')
      .and('have.class', 'rounded-4xl')
      .and('have.class', 'h-[500px]');
  });

  it('renders content section with correct width classes', () => {
    cy.mount(<InfoBlock block={mockBlock} />);
    cy.get('div.flex.flex-col.gap-4').should('have.class', 'md:w-3/5');
  });
});
