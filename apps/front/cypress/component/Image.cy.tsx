import ImageBlock from '../../components/elements/Media';

describe('Image Component', () => {
  const mockBlock = {
    __component: "elements.media" as const,
    id: 1,
    media: {
      url: '/test-image.jpg',
      alternativeText: 'Test Image',
      mime: 'image/jpeg'
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

  it('returns null when media is invalid', () => {
    const blockWithInvalidMedia = {
      ...mockBlock,
      media: { url: '' } // Empty URL should trigger the validation error
    };
    cy.mount(<ImageBlock block={blockWithInvalidMedia} alt="Test Alt Text" />);
    cy.get('img').should('not.exist');
  });

  it('returns null when media URL is invalid', () => {
    const blockWithInvalidUrl = {
      ...mockBlock,
      media: { ...mockBlock.media, url: '/invalid.txt' }
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
