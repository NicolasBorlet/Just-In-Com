import Button, { ButtonWidth } from '../../components/globals/Button';

describe('Button Component', () => {
  it('renders with default width', () => {
    cy.mount(<Button href="/test" isExternal={false}>Test Button</Button>);
    cy.get('a').should('have.class', 'w-auto');
  });

  it('renders with full width', () => {
    cy.mount(<Button href="/test" isExternal={false} width={ButtonWidth.FULL}>Test Button</Button>);
    cy.get('a').should('have.class', 'w-full');
  });

  it('renders with fit width', () => {
    cy.mount(<Button href="/test" isExternal={false} width={ButtonWidth.FIT}>Test Button</Button>);
    cy.get('a').should('have.class', 'w-fit');
  });

  it('opens in new tab when external', () => {
    cy.mount(<Button href="/test" isExternal={true}>Test Button</Button>);
    cy.get('a').should('have.attr', 'target', '_blank');
  });

  it('opens in same tab when not external', () => {
    cy.mount(<Button href="/test" isExternal={false}>Test Button</Button>);
    cy.get('a').should('have.attr', 'target', '_self');
  });

  it('has correct href attribute', () => {
    const testHref = '/test-path';
    cy.mount(<Button href={testHref} isExternal={false}>Test Button</Button>);
    cy.get('a').should('have.attr', 'href', testHref);
  });

  it('renders children correctly', () => {
    const buttonText = 'Click me';
    cy.mount(<Button href="/test" isExternal={false}>{buttonText}</Button>);
    cy.get('a').should('contain', buttonText);
  });
});
