describe('Assignment 4 GUI Tests', () => {

  beforeEach(() => {

    cy.visit('http://localhost:3000')

    cy.get('#email').type('lucky123@gmail.com')

    cy.get('input[type="submit"]').click()

  })

  it('TC1 - Create Todo', () => {

    cy.get('input[placeholder="Title of your Task"]')
      .type('Task Cypress')

    cy.get('input[placeholder*="Viewkey"]')
      .type('dQw4w9WgXcQ')

    cy.contains('Create new Task').click()

    cy.contains('Task Cypress').should('exist')

  })

  it('TC2 - Toggle Todo', () => {

    cy.contains('Task Cypress').click()

    cy.get('input[placeholder="Add a new todo item"]')
      .type('Finish Assignment 4', { force: true })

    cy.contains('Add')
      .click({ force: true })

    cy.contains('Finish Assignment 4')
      .should('exist')

    cy.contains('Finish Assignment 4')
      .click({ force: true })

  })

  it('TC3 - Delete Todo', () => {

    cy.contains('Task Cypress').click()

    cy.contains('Finish Assignment 4')
      .should('exist')

    cy.get('.remover')
      .last()
      .click({ force: true })

  })

  it('TC4 - Add Multiple Todo Items', () => {

    cy.contains('Task Cypress').click()

    cy.get('input[placeholder="Add a new todo item"]')
      .type('Todo One', { force: true })

    cy.contains('Add')
     .click({ force: true })

    cy.get('input[placeholder="Add a new todo item"]')
      .type('Todo Two', { force: true })

    cy.contains('Add')
      .click({ force: true })

    cy.contains('Todo One')
      .should('exist')

    cy.contains('Todo Two')
      .should('exist')

  })

  it('TC5 - Verify Video Todo Exists', () => {

    cy.contains('Task Cypress')
      .click()

    cy.contains('Watch video')
      .should('exist')

  })

})