export default {
    candidateCard() {
        return cy.get('[data-cy=candidate-card]');
    },
    cpfField() {
        return cy.get('[data-cy=search-by-cpf]')
            .scrollIntoView();
    },
    candidateCardMenu(candidanteCard: Cypress.Chainable<JQuery<HTMLElement>>) {
        return candidanteCard.find('[data-cy=candidate-card-menu-button]');
    },
    candidateDeleteButton() {
        return cy.get('[data-cy=candidate-card-delete-button]');
    },
    candidateDetailsButton() {
        return cy.get('[data-cy=candidate-card-details-button]');
    },
    candidateDetails() {
        return cy.get('[data-cy=candidate-details]');
    },
    deleteCandidateModalButon() {
        return cy.get('[data-cy=delete-candidate-modal-button]');
    }
};