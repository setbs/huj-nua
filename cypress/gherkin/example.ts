import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

When('User visits the app', () => {
  cy.visit('https://www.shino.de/parkcalc/');
});

Then('User should see the app heading', () => {
  cy.get('.PageTitle')
    .should('contain', 'PARKING COST CALCULATOR');
});
