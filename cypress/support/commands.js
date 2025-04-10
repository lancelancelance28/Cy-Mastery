Cypress.Commands.add('auth', (username, password) => {

    cy.visit('https://www.saucedemo.com/', {timeout: 240000})
    cy.get('[data-test="username"]').type(username)
    cy.get('[data-test="password"]').type(password)
    cy.get('[data-test="login-button"]').click()

}); 

Cypress.Commands.add('addToCart', (productTestId) => {

    cy.get(`[data-test="${productTestId}"]`)
      .should('be.visible')
      .click();
    cy.get('.shopping_cart_badge').should('contain', '1')
 
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


  Cypress.Commands.add('Register', (customerData) => {
    
    cy.get('input[id="customer.firstName"]').type(customerData.firstName);
    cy.get('input[id="customer.lastName"]').type(customerData.lastName);
    cy.get('input[id="customer.address.street"]').type(customerData.street);
    cy.get('input[id="customer.address.city"]').type(customerData.city);
    cy.get('input[id="customer.address.state"]').type(customerData.state);
    cy.get('input[id="customer.address.zipCode"]').type(customerData.zipCode);
    cy.get('input[id="customer.phoneNumber"]').type(customerData.phoneNumber);
    cy.get('input[id="customer.ssn"]').type(customerData.ssn);
    cy.get('input[id="customer.username"]').type(customerData.username);
    cy.get('input[id="customer.password"]').type(customerData.password);
    cy.get('input[id="repeatedPassword"]').type(customerData.password);

    cy.get('input[type="submit"][value="Register"]').click();

  });

  Cypress.Commands.add('Login', (username,password) => {
    
    cy.visit('https://parabank.parasoft.com/parabank/admin.htm')
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('input[type="submit"][value="Log In"]').click();

  });