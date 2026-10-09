describe('Parking app (standard test)', function () {

  context('User visits the app', function () {

    beforeEach(function () {
      cy.visit('https://www.shino.de/parkcalc/');
    });

    it('should display the app heading', function () {
      cy.get('.PageTitle')
        .should('contain', 'PARKING COST CALCULATOR');
    });
  });
});
