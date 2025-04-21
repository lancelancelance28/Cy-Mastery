import generateUserData from "../../support/automationExerciseFaker";

const getDate = () => {
  const now = new Date();
  return `${now.getMonth() + 1}-${now.getDate()}-${now.getFullYear()}`;
};

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
    cy.screenshot(`AET14-AddCart-${getDate()}`);
    cy.contains('Proceed To Checkout').click();

    cy.get('.modal-body').should('be.visible');
    cy.get('.modal-body a[href="/login"]').click();

    cy.AutomationExerciseRegister(UserFake)
    cy.screenshot(`AET14-Register-${getDate()}`);
    cy.contains(`Logged in as ${UserFake.name}`).should('be.visible');
    
    cy.AutomationExerciseCheckout()
    cy.screenshot(`AET14-Checkout-${getDate()}`);
    cy.AutomationExerciseFillPayment(UserFake)
    cy.screenshot(`AET14-Payment-${getDate()}`);
    cy.AutomationExerciseDeleteAccount()
    cy.screenshot(`AET14-DeleteAccount-${getDate()}`);
  });


  it('Test Case 15: Place order after registering during checkout', () => {

    cy.get('a[href="/login"]').contains('Signup / Login').click();

    cy.AutomationExerciseRegister(UserFake)
    cy.screenshot(`AET15-Register-${getDate()}`);
    cy.contains(`Logged in as ${UserFake.name}`).should('be.visible');

    cy.AutomationExerciseAddCart()
    cy.screenshot(`AET15-AddCart-${getDate()}`);
    cy.AutomationExerciseCheckout()
    cy.screenshot(`AET15-Checkout-${getDate()}`);
    cy.AutomationExerciseFillPayment(UserFake)
    cy.screenshot(`AET15-Payment-${getDate()}`);
    cy.AutomationExerciseDeleteAccount()
    cy.screenshot(`AET15-DeleteAccount-${getDate()}`);
    
  });

  it('Test Case 16: Place order after registering during checkout', () => {

    cy.get('a[href="/login"]').contains('Signup / Login').click();
    cy.AutomationExerciseRegister(UserFake)
    cy.screenshot(`AET16-Register-${getDate()}`);
    cy.contains(`Logged in as ${UserFake.name}`).should('be.visible');
    cy.get('a[href="/logout"]').contains('Logout').click();
    cy.screenshot(`AET16-Logout-${getDate()}`);
    cy.fixture('userData.json').then((userData) => {
      // Pass the userData to the login command
      cy.AutomationExerciseLogin(userData);
    });
    cy.screenshot(`AET16-Login-${getDate()}`);
    
    cy.contains(`Logged in as ${UserFake.name}`).should('be.visible');

    cy.AutomationExerciseAddCart()
    cy.screenshot(`AET16-AddCart-${getDate()}`);
    cy.AutomationExerciseCheckout()
    cy.screenshot(`AET16-Checkout-${getDate()}`);
    cy.AutomationExerciseFillPayment(UserFake)
    cy.screenshot(`AET16-Payment-${getDate()}`);
    cy.AutomationExerciseDeleteAccount()
    cy.screenshot(`AET16-DeleteAccount-${getDate()}`);
    
  });
});
