describe('Assignment 4 - Requirement 8 GUI Tests', () => {

  let uid
  let email
  let taskTitle = `Assignment4 Test Task ${Date.now()}`
  let todoText = 'Assignment4 Todo'

  before(() => {
    cy.fixture('user.json').then((user) => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:5000/users/create',
        form: true,
        body: user
      }).then((response) => {
        uid = response.body._id.$oid
        email = user.email
      })
    })
  })

  beforeEach(() => {

    cy.visit('/')

    cy.contains('div', 'Email Address')
      .find('input[type=text]')
      .clear()
      .type(email)

    cy.get('form').submit()

    cy.get('body').then(($body) => {

      if ($body.text().includes(taskTitle)) {
        cy.contains(taskTitle).click()
      } else {

        cy.get('input[placeholder="Title of your Task"]')
          .type(taskTitle)

        cy.get('input[placeholder*="Viewkey"]')
          .type('9bZkp7q19f0')

        cy.contains('Create new Task').click()

        cy.contains(taskTitle).click()
      }
    })
  })

  after(() => {
    cy.request({
      method: 'DELETE',
      url: `http://localhost:5000/users/${uid}`
    })
  })

  // ---------------------------------------------------
  // R8UC1 – Create Todo Item
  // ---------------------------------------------------

  it('TC1 (1.1) - Empty Description Todo Creation', () => {

  cy.get('input[placeholder="Add a new todo item"]')
    .clear({ force: true });

  cy.contains('input', 'Add')
    .should('be.disabled');

});

  it('TC2 (1.2) - Non-Empty Description Todo Creation', () => {

        cy.get('input[placeholder="Add a new todo item"]')
            .clear({ force: true })
            .type(todoText, { force: true })

        cy.contains('input', 'Add')
            .click({ force: true })

        cy.contains(todoText)
            .should('exist')
    })

    // --------------------------------------------------
    // TC3 - Toggle Unchecked -> Checked
    // --------------------------------------------------

    it('TC3 (2.1) - Toggle Todo From Unchecked To Checked', () => {

        cy.get('input[placeholder="Add a new todo item"]')
            .clear({ force: true })
            .type('Toggle Check Todo', { force: true })

        cy.contains('input', 'Add')
            .click({ force: true })

        cy.get('.checker.unchecked')
            .last()
            .click({ force: true })

        cy.get('.checker.checked')
            .should('exist')
    })

    // --------------------------------------------------
    // TC4 - Toggle Checked -> Unchecked
    // --------------------------------------------------

    it('TC4 (2.2) - Toggle Todo From Checked To Unchecked', () => {

        cy.get('input[placeholder="Add a new todo item"]')
            .clear({ force: true })
            .type('Toggle Back Todo', { force: true })

        cy.contains('input', 'Add')
            .click({ force: true })

        cy.get('.checker.unchecked')
            .last()
            .click({ force: true })

        cy.get('.checker.checked')
            .last()
            .click({ force: true })

        cy.get('.checker.unchecked')
            .should('exist')
    })

    // --------------------------------------------------
    // TC5 - Delete Existing Todo Item
    // --------------------------------------------------

    it('TC5 (3.1) - Delete Existing Todo Item', () => {

    cy.get('input[placeholder="Add a new todo item"]')
        .clear({ force: true })
        .type('Delete Test Todo', { force: true })

    cy.contains('input', 'Add')
        .click({ force: true })

    cy.contains('Delete Test Todo')
        .should('exist')

    cy.get('.remover')
        .last()
        .click({ force: true })

    cy.wait(1000)

    cy.contains('Delete Test Todo')
        .should('not.exist')
})
})
