/// <reference path="../support/e2e.d.ts" />
// If you add more support files, you may need to add the line above to the file and import the new file into e2e.ts.

// In case you are not familiar with Typescript in Cypress, please note:
// when you add a command, you must also add a line to the type definition in /support/e2e.d.ts.
// An example has been provided for the "getByClass" command below.

Cypress.Commands.add('getByClass', (className: string) => cy.get(`.${className}`));
