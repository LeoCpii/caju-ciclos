export default {
    nameInput() {
        return cy.get('[data-cy=name-input]')
            .parent()
            .parent();
    },
    emailInput() {
        return cy.get('[data-cy=email-input]')
            .parent()
            .parent();
    },
    cpfInput() {
        return cy.get('[data-cy=cpf-input]')
            .parent()
            .parent();
    },
    admissionDateInput() {
        return cy.get('[data-cy=admission-date-input]')
            .parent()
            .parent();
    },
    positionSelect() {
        return cy.get('[data-cy=position-select]');
    },
    frontEndOption() {
        return cy.get('[data-cy=frontend-option]');
    },
    submitButton() {
        return cy.get('[data-cy=submit-button]');
    }
};