import HeroSection from '../../components/blocks/HeroSection';

describe('HeroSection Component', () => {
  const mockBlock = {
    __component: "blocks.hero-section" as const,
    id: 1,
    heading: 'Test Heading',
    video: {
      id: 1,
      documentId: 'test-video',
      url: '/test-video.mp4'
    }
  };

  it('renders video with correct attributes', () => {
    cy.mount(<HeroSection block={mockBlock} />);
    cy.get('video')
      .should('have.attr', 'src')
      .and('include', '/test-video.mp4');
    cy.get('video')
      .should('have.attr', 'autoPlay')
      .and('have.attr', 'muted')
      .and('have.attr', 'loop');
  });

  it('renders heading when provided', () => {
    cy.mount(<HeroSection block={mockBlock} />);
    cy.get('h1')
      .should('contain', 'Test Heading')
      .and('have.class', 'text-4xl')
      .and('have.class', 'font-bold')
      .and('have.class', 'text-white');
  });

  it('renders without heading when not provided', () => {
    const blockWithoutHeading = { ...mockBlock, heading: '' };
    cy.mount(<HeroSection block={blockWithoutHeading} />);
    cy.get('h1').should('not.exist');
  });

  it('applies correct layout classes', () => {
    cy.mount(<HeroSection block={mockBlock} />);
    cy.get('div').first().should('have.class', 'relative').and('have.class', 'h-screen').and('have.class', 'w-full');
    cy.get('video').should('have.class', 'absolute').and('have.class', 'inset-0').and('have.class', 'h-full').and('have.class', 'w-full').and('have.class', 'object-cover');
    cy.get('div').eq(1).should('have.class', 'absolute').and('have.class', 'inset-0').and('have.class', 'flex').and('have.class', 'items-center').and('have.class', 'justify-center');
    cy.get('div').last().should('have.class', 'absolute').and('have.class', 'inset-0').and('have.class', 'bg-black/20');
  });
});
