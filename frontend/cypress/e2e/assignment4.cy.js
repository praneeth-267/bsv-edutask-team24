describe('Assignment 4 GUI Tests', () => {

  beforeEach(() => {

    cy.visit('http://localhost:3000')

    cy.get('#email')
      .type('spy@gmail.com')

    cy.get('input[type="submit"]')
      .click()

    // Create independent task for every test
    cy.get('input[placeholder="Title of your Task"]')
      .type('Task Python')

    cy.get('input[placeholder*="Viewkey"]')
      .type('rfscVS0vtbw')

    cy.contains('Create new Task')
      .click()

  })

  it('TC1 - Create Todo Task', () => {

    // Verify task creation
    cy.contains('Task Python')
      .should('exist')

  })

  it('TC2 - Add Todo Item', () => {

    cy.contains('Task Python')
      .click()

    // Add todo item
    cy.get('input[placeholder="Add a new todo item"]')
      .type('Finish Assignment 4', { force: true })

    cy.contains('Add')
      .click({ force: true })

    // Verify todo item exists
    cy.contains('Finish Assignment 4')
      .should('exist')

  })

  it('TC3 - Toggle Todo Item', () => {

    cy.contains('Task Python')
      .click()

    // Create todo item
    cy.get('input[placeholder="Add a new todo item"]')
      .type('Toggle Todo', { force: true })

    cy.contains('Add')
      .click({ force: true })

    // Verify todo item exists
    cy.contains('Toggle Todo')
      .should('exist')

    // Toggle todo item
    cy.contains('Toggle Todo')
      .click({ force: true })

  })

  it('TC4 - Delete Todo Item', () => {

    cy.contains('Task Python')
      .click()

    // Create todo item
    cy.get('input[placeholder="Add a new todo item"]')
      .type('Delete Todo', { force: true })

    cy.contains('Add')
      .click({ force: true })

    // Verify todo item exists
    cy.contains('Delete Todo')
      .should('exist')

    // Delete todo item
    cy.get('.remover')
      .last()
      .click({ force: true })

  })


  it('TC5 - Verify Default Watch Video Todo Exists', () => {

    cy.contains('Task Python')
      .click()

    // Verify default todo item exists
    cy.contains('Watch video')
      .should('exist')

  })

})
