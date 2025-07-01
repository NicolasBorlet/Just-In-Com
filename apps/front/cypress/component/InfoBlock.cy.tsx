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

  it('renders image with correct responsive dimensions and classes', () => {
    cy.mount(<InfoBlock block={mockBlock} />);
    cy.get('img')
      .should('have.attr', 'width', '340')
      .and('have.attr', 'height', '500')
      .and('have.class', 'object-cover')
      .and('have.class', 'rounded-4xl')
      .and('have.class', 'h-[300px]')
      .and('have.class', 'md:h-[500px]')
      .and('have.class', 'w-3/5')
      .and('have.class', 'md:w-2/5')
      .and('have.class', 'self-center');
  });

  it('renders content section with correct responsive width classes', () => {
    cy.mount(<InfoBlock block={mockBlock} />);
    cy.get('div.flex.flex-col.gap-4').should('have.class', 'w-full').and('have.class', 'md:w-3/5');
  });

  it('applies correct padding classes', () => {
    cy.mount(<InfoBlock block={mockBlock} />);
    cy.get('div.flex.flex-col.md\\:flex-row')
      .should('have.class', 'px-2')
      .and('have.class', 'md:px-4')
      .and('have.class', 'lg:px-5')
      .and('have.class', 'xl:px-6');
  });

  it('applies correct gap classes', () => {
    cy.mount(<InfoBlock block={mockBlock} />);
    cy.get('div.flex.flex-col.md\\:flex-row')
      .should('have.class', 'gap-8')
      .and('have.class', 'lg:gap-20');
  });

  it('renders heading with correct typography classes', () => {
    cy.mount(<InfoBlock block={mockBlock} />);
    cy.get('h1')
      .should('have.class', 'text-6xl')
      .and('have.class', 'md:text-8xl/tight')
      .and('have.class', 'font-special');
  });
});
