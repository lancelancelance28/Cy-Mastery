import {generateFakeUser} from '../../support/userfaker'

describe('Parabank User Flow - Registration, Login, Logout', () => {

    const fakeUser= generateFakeUser()

    const customerData = {
      firstName: 'Juan',
      lastName: 'Perez',
      street: '1234 Elm St',
      city: 'Madrid',
      state: 'Madrid',
      zipCode: '28001',
      phoneNumber: '612345678',
      ssn: '123-45-6789',
      username: 'juanperez123',
      password: 'Password123!',
    };


    before(() => {
        // cy.fixture('Static/CustomerData').then((data) => {
        //   customerData = data;
        // });
        cy.visit('https://parabank.parasoft.com/parabank/admin.htm')
        cy.get('button[name="action"][value="CLEAN"]').click();
        cy.visit('https://parabank.parasoft.com/parabank/register.htm')
      });

    it('Successfully Register to the Parabank Website', () => {
        
          cy.fillRegistrationForm(customerData);
          cy.contains('Your account was created successfully').should('be.visible');

    })

    it('Successfully Register using Faker to the Parabank Website', () => {

        cy.visit('https://parabank.parasoft.com/parabank/register.htm')
        cy.task('saveUserFixture', fakeUser);
        cy.fillRegistrationForm(fakeUser);
        cy.contains('Your account was created successfully').should('be.visible');

  })


    it('Successfully Log in to the Parabank Website using valid credentials', () => {

        cy.Login(customerData.username,customerData.password)
        cy.contains('Accounts Overview').should('be.visible')
        cy.url().should('include', '/overview.htm')

     })
     
     it('Successfully logs in to the Parabank website using Faker', () => {
        
        cy.fixture('fakeUser').then((customerData) => {
        cy.Login(customerData.username, customerData.password);
        cy.contains('Accounts Overview').should('be.visible');
        cy.url().should('include', '/overview.htm');

        });
      });

     it('Successfully Log out after loggin in with valid credentials', () => {

        cy.Login(customerData.username,customerData.password)
        cy.contains('Log Out').click(); 
        cy.url().should('include', '/index.htm');  
        cy.contains('Log In').should('be.visible'); 

      });
  })
  
  