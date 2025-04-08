// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('auth', (username, password) => {
    cy.visit('https://www.saucedemo.com/', {timeout: 240000})
      cy.get('[data-test="username"]').type(username)
      cy.get('[data-test="password"]').type(password)
      cy.get('[data-test="login-button"]').click()
}); 

Cypress.Commands.add('addToCart', (productTestId) => {
    // Add product to the cart
    cy.get(`[data-test="${productTestId}"]`)
      .should('be.visible')
      .click();
      cy.get('.shopping_cart_badge').should('contain', '1')
 
     // Optionally, navigate to the cart and verify item is listed
     cy.get('.shopping_cart_link').click()
     cy.url().should('include', '/cart.html')
     cy.get('.cart_item').should('have.length', 1)
     cy.get('.inventory_item_name').should('contain', 'Sauce Labs Backpack')
  });

  Cypress.Commands.add('checkOut', (firstName, lastName, postalCode) => {
   
    cy.get('.shopping_cart_link').click()
    cy.url().should('include', '/cart.html')

    cy.get('.checkout_button').click()

    cy.url().should('include', '/checkout-step-one.html')
    cy.get('[data-test="firstName"]').type(firstName)
    cy.get('[data-test="lastName"]').type(lastName)
    cy.get('[data-test="postalCode"]').type(postalCode)
    cy.get('[data-test="continue"]').click()

    
    cy.url().should('include', '/checkout-step-two.html')
    cy.get('.summary_info').should('be.visible')
    cy.get('.summary_total_label').should('contain', 'Total:') 
    

    cy.get('[data-test="finish"]').click()
    
        cy.url().should('include', '/checkout-complete.html')
        cy.get('.complete-header').should('contain', 'Thank you for your order!')
  });