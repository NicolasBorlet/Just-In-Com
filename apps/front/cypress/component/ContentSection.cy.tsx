import ContentSection from '../../components/blocks/ContentSection';

describe('ContentSection Component', () => {
  const mockBlock = {
    __component: "blocks.content-section" as const,
    id: 1,
    title: 'Test Title',
    description: 'Test Description',
    horizontal: false,
    grid: false,
    gallerie: [
      {
        id: 1,
        documentId: 'test-image-1',
        url: '/test-image-1.jpg',
        alternativeText: 'Test Image 1',
        width: 800,
        height: 600
      },
      {
        id: 2,
        documentId: 'test-image-2',
        url: '/test-image-2.jpg',
        alternativeText: 'Test Image 2',
        width: 800,
        height: 600
      }
    ],
    cta: {
      id: 1,
      text: 'Test Button',
      href: '/test-link',
      isExternal: false
    }
  };

  beforeEach(() => {
    cy.mount(<ContentSection block={mockBlock} />);
    // Attendre que les styles soient chargés
    cy.wait(1000);
  });

  it('renders title and description correctly', () => {
    cy.get('h2')
      .should('exist')
      .and('be.visible')
      .and('contain', 'Test Title')
      .and('have.class', 'text-6xl')
      .and('have.class', 'md:text-8xl')
      .and('have.class', 'text-center')
      .and('have.class', 'font-special');

    cy.get('p')
      .should('exist')
      .and('be.visible')
      .and('contain', 'Test Description')
      .and('have.class', 'text-lg')
      .and('have.class', 'md:text-2xl')
      .and('have.class', 'text-center')
      .and('have.class', 'max-w-3xl')
      .and('have.class', 'mx-auto');
  });

  it('renders images in grid layout when horizontal is false', () => {
    cy.get('div.grid')
      .should('exist')
      .and('have.class', 'grid-cols-1')
      .and('have.class', 'gap-10');

    cy.get('img').should('have.length', 2);
    // Vérifier que les images sont présentes sans vérifier l'URL exacte
    cy.get('img').first().should('be.visible');
    cy.get('img').last().should('be.visible');
  });

  it('renders images in flex layout when horizontal is true', () => {
    const horizontalBlock = { ...mockBlock, horizontal: true };
    cy.mount(<ContentSection block={horizontalBlock} />);

    cy.get('div.flex')
      .should('exist')
      .and('have.class', 'gap-10');

    cy.get('img').should('have.length', 2);
  });

  it('renders CTA button correctly', () => {
    cy.get('a')
      .should('exist')
      .and('be.visible')
      .and('contain', 'Test Button')
      .and('have.attr', 'href', '/test-link')
      .and('have.class', 'bg-primary')
      .and('have.class', 'text-white')
      .and('have.class', 'px-5')
      .and('have.class', 'py-2')
      .and('have.class', 'rounded-2xl')
      .and('have.class', 'hover:bg-secondary')
      .and('have.class', 'transition-all')
      .and('have.class', 'duration-300')
      .and('have.class', 'w-fit')
      .and('have.class', 'self-center')
      .and('have.class', 'font-special');
  });

  it('renders without description when not provided', () => {
    const blockWithoutDescription = { ...mockBlock, description: '' };
    cy.mount(<ContentSection block={blockWithoutDescription} />);
    cy.get('p').should('not.exist');
  });

  it('applies correct layout classes', () => {
    // Vérifier le conteneur principal
    cy.get('div.flex.flex-col')
      .should('exist')
      .and('have.class', 'gap-12');

    // Vérifier le conteneur du titre et de la description
    cy.get('div.flex.flex-col.gap-4')
      .should('exist');

    // Vérifier le conteneur de la galerie
    cy.get('div.grid')
      .should('exist')
      .and('have.class', 'grid-cols-1')
      .and('have.class', 'gap-10');
  });
});
