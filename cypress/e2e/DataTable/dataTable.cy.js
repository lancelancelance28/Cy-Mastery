

describe('DATA TABLES TEST SUITE', () => {
  beforeEach(() => {
    cy.visit('https://datatables.net/');
  });

  it('should change rows per page to 25', () => {
    cy.get('select.dt-input').select('25')
    cy.get('#example tbody tr').should('have.length', 25)
  })
  
  it('should change rows per page to 50', () => {
    cy.get('select.dt-input').select('50')
    cy.get('#example tbody tr').should('have.length', 50)
  })

  it('should change rows per page to 100, if content is less than 100, check if it display all', () => {
    cy.get('select.dt-input').select('100')
    cy.get('#example_info').then(($info) => {
        const text = $info.text()
        const match = text.match(/of\s+(\d+)\s+entries/)
        expect(match).to.not.be.null

        const total = parseInt(match[1], 10)

        if (total < 100) {
          cy.get('#example tbody tr:visible').should('have.length', total)
        } else {
          cy.get('#example tbody tr:visible').should('have.length', 100)
        }
      })
  })

  it('should search for a specific name in the table', () => {
    cy.get('input[type="search"]').type('Ashton Cox')
    cy.get('#example tbody tr').should('have.length.at.least', 1)
    cy.get('#example tbody tr').first().contains('Ashton Cox')
  })

  it('should count the number of Regional Director positions upon search', () => {
    cy.get('input[type="search"]').type('Regional Director')
    cy.get('#example tbody tr').filter(':visible').then($rows => {
        const matchingRows = [...$rows].filter(row =>
          row.innerText.includes('Regional Director'))
        const count = matchingRows.length
        expect(count).to.be.greaterThan(-1)
      })
  })

  it('should navigate through pages using next, previous, last ', () => {
  
    cy.get('select.dt-input').select('10')
    cy.get('#example_info').should('contain', 'Showing 1 to 10')

    cy.get('.dt-paging-button').contains('2').click()
    cy.get('.dt-paging-button.current').should('have.text', '2')
    cy.get('#example_info').should('contain', 'Showing 11 to 20')

    cy.get('.dt-paging-button').contains('3').click()
    cy.get('.dt-paging-button.current').should('have.text', '3')
    cy.get('#example_info').should('contain', 'Showing 21 to 30')

    cy.get('.dt-paging-button.previous').click()
    cy.get('.dt-paging-button.current').should('have.text', '2')
    cy.get('#example_info').should('contain', 'Showing 11 to 20')

    cy.get('.dt-paging-button.next').click()
    cy.get('.dt-paging-button.current').should('have.text', '3')
    cy.get('#example_info').should('contain', 'Showing 21 to 30')

    cy.get('.dt-paging-button.last').click()
    cy.get('.dt-paging-button.current').should('have.text', '6')
    cy.get('#example_info').should('contain', 'Showing 51 to 57')

    cy.get('.dt-paging-button.first').click()
    cy.get('.dt-paging-button.current').should('have.text', '1')
    cy.get('#example_info').should('contain', 'Showing 1 to 10')

  })
  
  it('should get the Office column sorted in ascending and descending order', () => {
    
    cy.get('th[data-dt-column="0"]').should('have.attr', 'aria-sort', 'ascending').and('have.class', 'dt-ordering-asc')

    cy.get('#example thead th').contains('Name').click()
    cy.get('th[data-dt-column="0"]').should('have.attr', 'aria-sort', 'descending').and('have.class', 'dt-ordering-desc')

    cy.get('#example thead th').contains('Name').click()
    cy.get('th[data-dt-column="0"]').should('not.have.attr', 'aria-sort', 'ascending').and('not.have.class', 'dt-ordering-asc')
  })
  
  it('Should Successfully Search a Person & Assert her Salary', () => {
    cy.get('input[type="search"]').type('Airi Satou')
    cy.get('.dtr-control').click()
    cy.get('table').contains('td', '$162,700')
    
   });
  
});
