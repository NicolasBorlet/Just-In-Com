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

  beforeEach(() => {
    cy.mount(<HeroSection block={mockBlock} />);
    // Attendre que les styles soient chargés
    cy.wait(1000);
  });

  it('renders video with correct attributes', () => {
    // Attendre que la vidéo soit présente et visible
    cy.get('video').should('exist').and('be.visible');

    // Vérifier la source de la vidéo
    cy.get('video').should('have.attr', 'src').and('include', '/test-video.mp4');

    // Vérifier les attributs booléens
    cy.get('video').should('have.prop', 'autoplay', true);
    cy.get('video').should('have.prop', 'muted', true);
    cy.get('video').should('have.prop', 'loop', true);
    cy.get('video').should('have.prop', 'playsInline', true);
    cy.get('video').should('have.prop', 'disablePictureInPicture', true);

    // Vérifier controlsList en utilisant la propriété value
    cy.get('video').should('have.prop', 'controlsList')
      .and('have.property', 'value', 'nodownload nofullscreen noremoteplayback');

    cy.get('video').should('have.class', 'pointer-events-none');
  });

  it('renders heading when provided', () => {
    cy.get('h1')
      .should('exist')
      .and('be.visible')
      .and('contain', 'Test Heading')
      .and('have.class', 'text-7xl')
      .and('have.class', 'md:text-9xl')
      .and('have.class', 'font-bold')
      .and('have.class', 'text-white')
      .and('have.class', 'font-special');
  });

  it('renders without heading when not provided', () => {
    cy.mount(<HeroSection block={{ ...mockBlock, heading: '' }} />);
    cy.get('h1').should('not.exist');
  });

  it('applies correct layout classes', () => {
    // Attendre que le conteneur principal soit présent et visible
    cy.get('div.relative').should('exist').and('be.visible', { timeout: 10000 });

    // Vérifier les classes du conteneur principal
    cy.get('div.relative')
      .should('have.class', 'h-screen')
      .and('have.class', 'w-full');

    // Vérifier les classes de la vidéo
    cy.get('video')
      .should('have.class', 'absolute')
      .and('have.class', 'inset-0')
      .and('have.class', 'h-full')
      .and('have.class', 'w-full')
      .and('have.class', 'object-cover');

    // Vérifier les classes du conteneur du titre
    cy.get('div.flex')
      .should('have.class', 'absolute')
      .and('have.class', 'inset-0')
      .and('have.class', 'items-center')
      .and('have.class', 'justify-center');

    // Vérifier les classes de l'overlay
    cy.get('div.bg-black\\/20')
      .should('have.class', 'absolute')
      .and('have.class', 'inset-0');
  });
});
