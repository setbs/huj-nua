/// <reference types="cypress" />

declare namespace Cypress {
	interface Chainable {
		getByClass( className ): Chainable<any>;
		// newCustomCommandName( argument ): Chainable<any>;
	}
}
