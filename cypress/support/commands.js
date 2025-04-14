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


  Cypress.Commands.add('saveCart', () => {
    cy.window().then((win) => {
      const cart = win.localStorage.getItem('cart-contents') || '[]';
      Cypress.env('savedCart', cart);
    });
  });

  Cypress.Commands.add('restoreCart', () => {
    const cart = Cypress.env('savedCart') || '[]';
    cy.window().then((win) => {
      win.localStorage.setItem('cart-contents', cart);
    });
  });
  Cypress.Commands.add('AutomationExerciseRegister', (userData) => {
    cy.get('[data-qa="signup-name"]').type(userData.name);
    cy.get('[data-qa="signup-email"]').type(userData.email);
    cy.get('[data-qa="signup-button"]').click();

    cy.get('#id_gender1').check();
    cy.get('#password').type(userData.password);
    cy.get('#days').select('10');
    cy.get('#months').select('May');
    cy.get('#years').select('1990');
    cy.get('#first_name').type(userData.firstName);
    cy.get('#last_name').type(userData.lastName);
    cy.get('#address1').type(userData.address);
    cy.get('#country').select(userData.country);
    cy.get('#state').type(userData.state);
    cy.get('#city').type(userData.city);
    cy.get('#zipcode').type(userData.zipcode);
    cy.get('#mobile_number').type(userData.mobile);
    cy.get('[data-qa="create-account"]').click();

    cy.contains('Account Created!').should('be.visible');
    cy.contains('Continue').click();
    
  });


  Cypress.Commands.add('AutomationExerciseFillPayment', (userData) => {
    
    cy.get('[data-qa="name-on-card"]').type(userData.cardName);
    cy.get('[data-qa="card-number"]').type(userData.cardNumber);
    cy.get('[data-qa="cvc"]').type(userData.cvc);
    cy.get('[data-qa="expiry-month"]').type(userData.expiryMonth);
    cy.get('[data-qa="expiry-year"]').type(userData.expiryYear);

    cy.get('form#payment-form').then(($form) => {
      const rawForm = $form[0];
      rawForm.addEventListener('submit', (e) => {
        e.preventDefault();
      }, { once: true }); 
    });

    cy.contains('Pay and Confirm Order').click();
    cy.contains('Your order has been placed successfully!').should('be.visible');
    cy.contains('Pay and Confirm Order').click();
    cy.contains('Order Placed!').should('be.visible');
  });

  Cypress.Commands.add('AutomationExerciseAddCart', () => {
    
    cy.get('.features_items .product-image-wrapper').first().trigger('mouseover');
    cy.contains('Add to cart').click();

    // Click 'Continue Shopping' or go to cart
    cy.contains('View Cart').click();

    // Verify cart page
    cy.url().should('include', '/view_cart');
    cy.contains('Shopping Cart').should('be.visible');
  });

  Cypress.Commands.add('AutomationExerciseCheckout', () => {
    
    cy.contains('Cart').click();

    // Proceed to checkout again
    cy.contains('Proceed To Checkout').click();

    // Verify Address Details and Review
    cy.contains('Address Details').should('be.visible');
    cy.contains('Review Your Order').should('be.visible');

    // Enter comment and place order
    cy.get('textarea[name="message"]').type('Please deliver fast!');
    cy.contains('Place Order').click();
  });

  Cypress.Commands.add('AutomationExerciseDeleteAccount', () => {
    
    cy.contains('Delete Account').click();

    // Verify account deleted
    cy.contains('Account Deleted!').should('be.visible');
    cy.contains('Continue').click();
  });
  Cypress.Commands.add('AutomationExerciseLogin', (userData) => {
    
    cy.get('a[href="/login"]').contains('Signup / Login').click();
    cy.get('[data-qa="login-email"]').type(userData.email);
    cy.get('[data-qa="login-password"]').type(userData.password);
    cy.get('button[data-qa="login-button"]').click();
  });
