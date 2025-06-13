describe('Navigation', () => {
    it('should navigate to the about page', () => {
      // Start from the index page
      cy.visit('https://just-in-com.vercel.app/')

      // Wait for the element to be visible and scroll it into view
      cy.get('a[href*="a-propos"]')
        .first()
        .should('be.visible')
        .scrollIntoView()
        .click()

      // The new url should include "/about"
      cy.url().should('include', '/a-propos')

      // The new page should contain an h1 with "About"
      cy.get('h1').contains('À propos')
    })
  })
