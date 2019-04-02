describe('NPM', () => {

    beforeEach(() => {
        cy.visit('')
    })

    it('Search', () => {

        cy.server()
        cy.route('https://www.npmjs.com/search?q=Cypress').as('getSearch')

        cy.get('input[type=search]').type('Cypress{enter}', { delay: 100 })
            .wait('@getSearch')

        cy.url().should('contains', 'Cypress')

        cy.get('.flex').contains('cypress').click()

        cy.contains('visit our documentation')
            .and('have.attr', 'href')
            .and('include', 'cypress.io')
    })

    it('Login', () => {

        cy.server()
        cy.route('/login').as('getLogin')

        cy.contains('Log In').click().wait('@getLogin')

        cy.fixture("login.json").then((login) => {
            cy.contains('Username').next().type(login.username)
            cy.contains('Password').next().type(login.password)
        })

        cy.get('button').contains('Login').click()

        cy.get('img[alt=avatar]').click()

        cy.contains('Sign Out').click()
    })
})