/// <reference types='cypress' />

import mapper from './mapper';

describe('Admission', () => {
    beforeEach(() => {
        cy.dashboard();
    });

    it('should show all candidates', () => {
        mapper.candidateCard()
            .should('have.length', 3);
    });

    it('should show only 1 candidate when filtered by cpf', () => {
        mapper.cpfField()
            .type('95137183016');

        mapper.candidateCard()
            .should('have.length', 1);
    });

    it('should show empty columns when filtered by unkown cpf', () => {
        mapper.cpfField()
            .type('11111111111');

        mapper.candidateCard()
            .should('have.length', 0);
    });

    it('should show candidate details', () => {
        const candidateCard = mapper.candidateCard()
            .first();

        cy.wait(500);

        mapper.candidateCardMenu(candidateCard)
            .click();

        cy.wait(500);

        mapper.candidateDetailsButton()
            .first()
            .click();

        cy.wait(500);

        mapper.candidateDetails()
            .should('be.visible');
    });

    it('should delete candidate card', () => {
        const candidateCard = mapper.candidateCard()
            .first();

        cy.wait(500);

        mapper.candidateCardMenu(candidateCard)
            .click();

        cy.wait(500);

        mapper.candidateDeleteButton()
            .first()
            .click();

        cy.wait(500);

        mapper.deleteCandidateModalButon()
            .first()
            .click();

        mapper.candidateCard()
            .should('have.length', 2);
    });
});
