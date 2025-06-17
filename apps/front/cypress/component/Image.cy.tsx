import ImageBlock from '../../components/elements/Media';

describe('Image Component', () => {
  const mockBlock = {
    __component: "elements.image" as const,
    id: 1,
    image: {
      id: 1,
      documentId: 'test-image',
      url: '/test-image.jpg',
      alternativeText: 'Test Image',
      width: 800,
      height: 600
    }
  };

  beforeEach(() => {
    cy.mount(<ImageBlock block={mockBlock} alt="Test Alt Text" />);
    cy.wait(1000);
  });

  it('renders image correctly', () => {
    cy.get('div')
      .should('exist')
      .and('have.class', 'w-full')
      .and('have.class', 'h-[600px]');

    cy.get('img')
      .should('exist')
      .and('be.visible')
      .and('have.attr', 'alt', 'Test Alt Text')
      .and('have.class', 'w-full')
      .and('have.class', 'h-full')
      .and('have.class', 'object-cover')
      .and('have.class', 'object-center')
      .and('have.class', 'rounded-lg');
  });

  it('returns null when image is not provided', () => {
    const blockWithoutImage = { ...mockBlock, image: null };
    cy.mount(<ImageBlock block={blockWithoutImage} alt="Test Alt Text" />);
    cy.get('img').should('not.exist');
  });

  it('returns null when image URL is invalid', () => {
    const blockWithInvalidUrl = {
      ...mockBlock,
      image: { ...mockBlock.image, url: '/invalid.txt' }
    };
    cy.mount(<ImageBlock block={blockWithInvalidUrl} alt="Test Alt Text" />);
    cy.get('img').should('not.exist');
  });

  it('applies correct layout classes', () => {
    cy.get('div')
      .should('exist')
      .and('have.class', 'w-full')
      .and('have.class', 'h-[600px]');

    cy.get('img')
      .should('have.class', 'w-full')
      .and('have.class', 'h-full')
      .and('have.class', 'object-cover')
      .and('have.class', 'object-center')
      .and('have.class', 'rounded-lg');
  });
});
