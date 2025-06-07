import RichText from '../../components/globals/RichText';

describe('RichText Component', () => {
  it('renders headers correctly', () => {
    const content = '# H1 Title\n## H2 Title\n### H3 Title';
    cy.mount(<RichText content={content} />);
    cy.get('h1').should('contain', 'H1 Title');
    cy.get('h2').should('contain', 'H2 Title');
    cy.get('h3').should('contain', 'H3 Title');
  });

  it('renders bold and italic text correctly', () => {
    const content = '**Bold text** and *italic text*';
    cy.mount(<RichText content={content} />);
    cy.get('strong').should('contain', 'Bold text');
    cy.get('em').should('contain', 'italic text');
  });

  it('renders links correctly', () => {
    const content = '[Link text](https://example.com)';
    cy.mount(<RichText content={content} />);
    cy.get('a')
      .should('have.attr', 'href', 'https://example.com')
      .and('contain', 'Link text');
  });

  it('renders lists correctly', () => {
    const content = '* List item 1\n* List item 2';
    cy.mount(<RichText content={content} />);
    cy.get('ul').should('exist');
    cy.get('li').should('have.length', 2);
    cy.get('li').first().should('contain', 'List item 1');
    cy.get('li').last().should('contain', 'List item 2');
  });

  it('renders paragraphs correctly', () => {
    const content = 'First paragraph\n\nSecond paragraph';
    cy.mount(<RichText content={content} />);
    cy.get('p').should('have.length', 2);
    cy.get('p').first().should('contain', 'First paragraph');
    cy.get('p').last().should('contain', 'Second paragraph');
  });

  it('handles complex markdown combinations', () => {
    const content = '# Title\n**Bold** and *italic* text\n\n* List item with [link](https://example.com)';
    cy.mount(<RichText content={content} />);
    cy.get('h1').should('contain', 'Title');
    cy.get('strong').should('contain', 'Bold');
    cy.get('em').should('contain', 'italic');
    cy.get('li').should('contain', 'List item with');
    cy.get('a').should('have.attr', 'href', 'https://example.com');
  });
});
