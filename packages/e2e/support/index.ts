import { openPage } from './commands';

// eslint-disable-next-line
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTGVvbmFyZG8gR29uw6dhbHZlcyIsInBpY3R1cmUiOiJodHRwczovL3JvYm9oYXNoLm9yZy90ZXN0ZS1lMmUtcHJvamV0by1jYWp1IiwiZW1haWwiOiJsZW9nb25jYWx2ZXMuY29udGF0b0BnbWFpbC5jb20iLCJ1c2VyX2lkIjoiYWJjZGVmZ2gifQ.m6kdcMuAYkck7Y4GbBdXvsF-CoZqgn_dC_nxRqcSjV0';

// VISIT PAGES
Cypress.Commands.add('dashboard', () => { openPage('admissao'); });
Cypress.Commands.add('register', () => { openPage('admissao/cadastro'); });

Cypress.Commands.add('setToken', () => {
    cy.setCookie('access_token', token);
});

// Firebase
Cypress.Commands.add('login', () => {
    // eslint-disable-next-line max-len
    cy.request('POST', 'http://localhost:9099/identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=fake-api-key', {
        email: 'desafio@caju.com.br',
        password: 'Testando123',
        returnSecureToken: true
    }).then((response) => {
        const idToken = response.body.idToken;
        cy.setCookie('access_token', idToken);
    });
});

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            // MANAGER
            dashboard(): void;
            register(): void;

            // UTILS
            setToken(): void;

            // FIREBASE
            login(): void;
        }
    }
}
