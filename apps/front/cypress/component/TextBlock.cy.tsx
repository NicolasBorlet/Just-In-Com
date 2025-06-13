import TextBlock from '../../components/elements/TextBlock';

describe('TextBlock Component', () => {
  const mockBlock = {
    __component: "elements.text-box" as const,
    id: 1,
    title: 'Test Title',
    content: 'Test Content'
  };

  beforeEach(() => {
    cy.mount(<TextBlock block={mockBlock} />);
    cy.wait(1000);
  });

  it('renders title and content correctly', () => {
    cy.get('h2')
      .should('exist')
      .and('be.visible')
      .and('contain', 'Test Title')
      .and('have.class', 'text-2xl')
      .and('have.class', 'font-bold');

    cy.get('p')
      .should('exist')
      .and('be.visible')
      .and('contain', 'Test Content')
      .and('have.class', 'text-lg')
      .and('have.class', 'text-justify');
  });

  it('renders without title when not provided', () => {
    const blockWithoutTitle = { ...mockBlock, title: '' };
    cy.mount(<TextBlock block={blockWithoutTitle} />);
    cy.get('h2').should('not.exist');
  });

  it('renders without content when not provided', () => {
    const blockWithoutContent = { ...mockBlock, content: '' };
    cy.mount(<TextBlock block={blockWithoutContent} />);
    cy.get('p').should('not.exist');
  });

  it('applies correct layout classes', () => {
    cy.get('div')
      .should('exist')
      .and('have.class', 'flex')
      .and('have.class', 'flex-col')
      .and('have.class', 'gap-4');
  });
});
