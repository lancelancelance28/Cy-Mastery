describe('E-Commerce Test Flow/Workflow', () => {
    
    const getDate = () => {
        const now = new Date();
        return `${now.getMonth() + 1}-${now.getDate()}-${now.getFullYear()}`;
      };

   beforeEach(() => {
     cy.auth('standard_user', 'secret_sauce')
   });
 
   it('Should successfully login', () => {
     // Verify we're on the inventory page after login
     cy.url().should('include', '/inventory.html')
     cy.get('.inventory_list').should('be.visible')
     cy.screenshot(`login-${getDate()}`);
   });
 
   it('Should successfully add to cart', () => {
     // Add first product to cart
     cy.addToCart('add-to-cart-sauce-labs-backpack');
    
     cy.screenshot(`add-to-cart-${getDate()}`);
   });

   it('Should successfully complete checkout', () => {
    // Add product to cart (repeat from the add to cart test)
    cy.addToCart('add-to-cart-sauce-labs-backpack');
    
    // Enter checkout information
    cy.checkOut('John', 'Doe', '12345')

    cy.screenshot(`checkout-${getDate()}`);
  });
 });  