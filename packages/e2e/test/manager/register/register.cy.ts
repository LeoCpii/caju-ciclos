/// <reference types='cypress' />

import mapper from './mapper';

describe('Register', () => {
    beforeEach(() => {
        cy.register();
    });

    it('should show error message with form is empty', () => {
        mapper.submitButton()
            .click();

        cy.wait(500);

        mapper.nameInput()
            .should('contain', 'Informe o nome válido');

        mapper.emailInput()
            .should('contain', 'Este é um campo obrigatório');

        mapper.cpfInput()
            .should('contain', 'Este é um campo obrigatório');

        mapper.admissionDateInput()
            .should('contain', 'Este é um campo obrigatório');

        mapper.positionSelect()
            .parent()
            .parent()
            .should('contain', 'Este é um campo obrigatório');
    });

    it('should show error message with invalid name', () => {
        mapper.nameInput()
            .find('input')
            .type('1');

        cy.wait(500);

        mapper.nameInput()
            .should('contain', 'Informe o nome válido');
    });

    it('should show error message with uncomplete invalid name', () => {
        mapper.nameInput()
            .find('input')
            .type('Alceu V');

        cy.wait(500);

        mapper.nameInput()
            .should('contain', 'Informe o nome completo');
    });

    it('should show error message with invalid email', () => {
        mapper.emailInput()
            .find('input')
            .type('alceu');

        cy.wait(500);

        mapper.emailInput()
            .should('contain', 'O campo deve ser um email válido');
    });

    it('should show error message with invalid cpf', () => {
        mapper.cpfInput()
            .find('input')
            .type('123');

        cy.wait(500);

        mapper.cpfInput()
            .should('contain', 'O campo deve ser um CPF válido');
    });

    it('should create a new candidate', () => {
        mapper.nameInput()
            .type('Alceu Valença');

        mapper.emailInput()
            .type('alceuvalenca@gmail.com');

        mapper.cpfInput()
            .type('12345678900');

        mapper.admissionDateInput()
            .type('2021-01-01');

        mapper.positionSelect()
            .click();

        mapper.frontEndOption()
            .click();

        mapper.submitButton()
            .click();

        cy.url().should('match', /admissao/);
    });
});
