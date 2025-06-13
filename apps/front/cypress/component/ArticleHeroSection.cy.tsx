import ArticleHeroSection from '../../components/blocks/ArticleHeroSection';

describe('ArticleHeroSection Component', () => {
  const mockCover = {
    id: 1,
    documentId: 'test-cover',
    url: '/test-cover.jpg',
    alternativeText: 'Test Cover Image',
    width: 1920,
    height: 1080
  };

  beforeEach(() => {
    cy.mount(<ArticleHeroSection cover={mockCover} />);
    // Attendre que les styles soient chargés
    cy.wait(1000);
  });

  it('renders image with correct attributes', () => {
    // Vérifier que l'image est présente et visible
    cy.get('img')
      .should('exist')
      .and('be.visible')
      .and('have.attr', 'alt', 'Test Cover Image')
      .and('have.class', 'absolute')
      .and('have.class', 'inset-0')
      .and('have.class', 'h-full')
      .and('have.class', 'w-full')
      .and('have.class', 'object-cover');
  });

  it('renders overlay correctly', () => {
    cy.get('div.bg-black\\/20')
      .should('exist')
      .and('have.class', 'absolute')
      .and('have.class', 'inset-0');
  });

  it('applies correct layout classes', () => {
    // Vérifier le conteneur principal
    cy.get('div.relative')
      .should('exist')
      .and('have.class', 'h-[70vh]')
      .and('have.class', 'w-full');
  });

  it('renders without alternative text when not provided', () => {
    const coverWithoutAlt = { ...mockCover, alternativeText: '' };
    cy.mount(<ArticleHeroSection cover={coverWithoutAlt} />);
    cy.get('img').should('have.attr', 'alt', '');
  });
});
