import generateUserData from "../support/automationExerciseFaker";


describe('AutomationExercise Test Case 14,15,16', () => {
  const UserFake = generateUserData()
  beforeEach(() => {
    cy.visit('http://automationexercise.com');
    cy.writeFile('cypress/fixtures/userData.json', UserFake);
    // Verify home page is visible
    cy.get('body').should('contain', 'Home');
  });

  it('Test Case 14: Place order after registering during checkout', () => {
    
    cy.AutomationExerciseAddCart()
    cy.contains('Proceed To Checkout').click();

    cy.get('.modal-body').should('be.visible');
    cy.get('.modal-body a[href="/login"]').click();

    cy.AutomationExerciseRegister(UserFake)

    cy.contains(`Logged in as ${UserFake.name}`).should('be.visible');
    
    cy.AutomationExerciseCheckout()

    cy.AutomationExerciseFillPayment(UserFake)

    cy.AutomationExerciseDeleteAccount()
  });


  it('Test Case 15: Place order after registering during checkout', () => {

    cy.get('a[href="/login"]').contains('Signup / Login').click();

    cy.AutomationExerciseRegister(UserFake)

    cy.contains(`Logged in as ${UserFake.name}`).should('be.visible');

    cy.AutomationExerciseAddCart()
    cy.AutomationExerciseCheckout()
    cy.AutomationExerciseFillPayment(UserFake)
    cy.AutomationExerciseDeleteAccount()
    
  });

  it('Test Case 16: Place order after registering during checkout', () => {

    cy.get('a[href="/login"]').contains('Signup / Login').click();
    cy.AutomationExerciseRegister(UserFake)

    cy.contains(`Logged in as ${UserFake.name}`).should('be.visible');
    cy.get('a[href="/logout"]').contains('Logout').click();
    cy.fixture('userData.json').then((userData) => {
      // Pass the userData to the login command
      cy.AutomationExerciseLogin(userData);
    });
    
    cy.contains(`Logged in as ${UserFake.name}`).should('be.visible');

    cy.AutomationExerciseAddCart()
    cy.AutomationExerciseCheckout()
    cy.AutomationExerciseFillPayment(UserFake)
    cy.AutomationExerciseDeleteAccount()
    
  });
});
