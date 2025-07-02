import ContactForm from '../../components/elements/ContactForm';

describe('ContactForm Component', () => {
  beforeEach(() => {
    // Mock reCAPTCHA
    cy.window().then((win) => {
      win.grecaptcha = {
        ready: (callback: () => void) => callback(),
        execute: () => Promise.resolve('mocked-recaptcha-token'),
      };
    });

    cy.mount(<ContactForm />);
    cy.wait(1000);
  });

  it('renders all form fields correctly', () => {
    // Vérifier les champs du formulaire
    cy.get('select#reason').should('exist');
    cy.get('input#lastName').should('exist');
    cy.get('input#firstName').should('exist');
    cy.get('input#phone').should('exist');
    cy.get('input#email').should('exist');
    cy.get('select#prestation').should('exist');
    cy.get('textarea#message').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });

  it('shows validation errors for empty fields', () => {
    cy.get('button[type="submit"]').click();

    // Vérifier les messages d'erreur
    cy.get('span.text-sm.text-red-500').should('have.length.at.least', 1);
  });

  it('validates email format (HTML5)', () => {
    cy.get('input#email').type('invalid-email');
    cy.get('button[type="submit"]').click();
    cy.get('input#email').then($input => {
      const input = $input[0] as HTMLInputElement;
      expect(input.checkValidity()).to.be.false;
      expect(input.validationMessage).to.contain('@');
    });
  });

  it('validates email format (custom Zod)', () => {
    cy.get('input#email').type('a@a');
    cy.get('button[type="submit"]').click();
    cy.get('input#email').parent().parent().find('span.text-sm.text-red-500')
      .should('be.visible')
      .and('contain', 'Veuillez entrer une adresse email valide');
  });

  it('validates phone number length', () => {
    cy.get('input#phone').type('123');
    cy.get('button[type="submit"]').click();
    cy.get('input#phone').parent().parent().find('span.text-sm.text-red-500')
      .should('be.visible')
      .and('contain', 'Le numéro de téléphone doit contenir au moins 10 caractères');
  });

  it('validates message length', () => {
    cy.get('textarea#message').type('short');
    cy.get('button[type="submit"]').click();
    cy.get('textarea#message').parent().parent().find('span.text-sm.text-red-500')
      .should('be.visible')
      .and('contain', 'Le message doit contenir au moins 10 caractères');
  });

  it('applies correct styles to form elements', () => {
    // Vérifier les classes des champs
    cy.get('select#reason').should('have.class', 'bg-tertiary/30');
    cy.get('input#lastName').should('have.class', 'bg-tertiary/30');
    cy.get('input#firstName').should('have.class', 'bg-tertiary/30');
    cy.get('input#phone').should('have.class', 'bg-tertiary/30');
    cy.get('input#email').should('have.class', 'bg-tertiary/30');
    cy.get('select#prestation').should('have.class', 'bg-tertiary/30');
    cy.get('textarea#message').should('have.class', 'bg-tertiary/30');

    // Vérifier les classes du bouton
    cy.get('button[type="submit"]')
      .should('have.class', 'bg-primary')
      .and('have.class', 'text-white')
      .and('have.class', 'px-4')
      .and('have.class', 'py-2')
      .and('have.class', 'rounded-2xl')
      .and('have.class', 'hover:bg-secondary')
      .and('have.class', 'transition-all')
      .and('have.class', 'duration-300')
      .and('have.class', 'w-fit')
      .and('have.class', 'self-end');
  });

  it('handles form submission with reCAPTCHA', () => {
    cy.intercept('POST', '/api/contact', {
      statusCode: 200,
      body: { message: 'Success' }
    }).as('submitForm');

    cy.get('select#reason').select('contact');
    cy.get('input#lastName').type('Doe');
    cy.get('input#firstName').type('John');
    cy.get('input#phone').type('0123456789');
    cy.get('input#email').type('john.doe@example.com');
    cy.get('select#prestation').select('prestation1');
    cy.get('textarea#message').type('This is a test message that is long enough to be valid.');
    cy.get('button[type="submit"]').click();

    const expected = {
      reason: 'contact',
      lastName: 'Doe',
      firstName: 'John',
      phone: "0123456789",
      email: 'john.doe@example.com',
      prestation: 'prestation1',
      message: 'This is a test message that is long enough to be valid.',
      recaptchaToken: 'mocked-recaptcha-token'
    };

    cy.wait('@submitForm').then((interception) => {
      let body = interception.request.body;
      if (typeof body === 'string') {
        body = JSON.parse(body);
      }
      expect(body).to.deep.equal(expected);
    });
  });

  it('handles reCAPTCHA error', () => {
    // Mock reCAPTCHA error
    cy.window().then((win) => {
      win.grecaptcha = {
        ready: (callback: () => void) => callback(),
        execute: () => Promise.reject(new Error('reCAPTCHA error')),
      };
    });

    cy.get('select#reason').select('contact');
    cy.get('input#lastName').type('Doe');
    cy.get('input#firstName').type('John');
    cy.get('input#phone').type('0123456789');
    cy.get('input#email').type('john.doe@example.com');
    cy.get('select#prestation').select('prestation1');
    cy.get('textarea#message').type('This is a test message that is long enough to be valid.');

    cy.get('button[type="submit"]').click();

    // Vérifier que l'alerte d'erreur est affichée
    cy.on('window:alert', (str) => {
      expect(str).to.include('Une erreur est survenue lors de l\'envoi du message');
    });
  });
});
