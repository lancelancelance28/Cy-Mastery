describe('Sauce Demo Login Module', () => {
  it('Login using Valid Credentials', () => {
    cy.visit('https://www.saucedemo.com/')

    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')

    cy.get('[data-test="login-button"]').click()
    cy.contains('Swag Labs').should('be.visible')
    cy.url().should('include', '/inventory.html')
    
  })

  it('Login using Invalid Credentials', () => {
    cy.visit('https://www.saucedemo.com/')

    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce1')

    cy.get('[data-test="login-button"]').click()
    
    cy.get('[data-test="error"]').should('be.visible').and('contain','do not match')
    
  })
})

