import QuoteBlock from '../../components/blocks/QuoteBlock';

describe('QuoteBlock Component', () => {
  const mockBlock = {
    __component: "blocks.citation" as const,
    id: 1,
    content: '<p>Test Quote Content</p>'
  };

  beforeEach(() => {
    cy.mount(<QuoteBlock block={mockBlock} />);
    // Attendre que les styles soient chargés
    cy.wait(1000);
  });

  it('renders quote content correctly', () => {
    cy.get('div.quote-block')
      .should('exist')
      .and('be.visible')
      .and('have.class', 'flex')
      .and('have.class', 'items-center')
      .and('have.class', 'justify-center');

    // Vérifier que le contenu est rendu
    cy.get('p')
      .should('exist')
      .and('be.visible')
      .and('contain', 'Test Quote Content')
      .and('have.class', 'text-lg')
      .and('have.class', 'md:text-xl');
  });

  it('renders complex HTML content', () => {
    const complexBlock = {
      ...mockBlock,
      content: '<p>Test <strong>Bold</strong> and <em>Italic</em> Content</p>'
    };
    cy.mount(<QuoteBlock block={complexBlock} />);

    cy.get('p')
      .should('exist')
      .and('contain', 'Test')
      .and('contain', 'Bold')
      .and('contain', 'Italic');

    cy.get('strong').should('contain', 'Bold');
    cy.get('em').should('contain', 'Italic');
  });

  it('applies correct layout classes', () => {
    // Vérifier le conteneur principal
    cy.get('div.quote-block')
      .should('exist')
      .and('have.class', 'flex')
      .and('have.class', 'items-center')
      .and('have.class', 'justify-center');

    // Vérifier les classes du texte
    cy.get('p')
      .should('have.class', 'text-lg')
      .and('have.class', 'md:text-xl');
  });
});
