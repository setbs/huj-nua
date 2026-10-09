export type ParkingLot =
  | "Valet"
  | "Short"
  | "Economy"
  | "Long-Garage"
  | "Long-Surface";

export interface ParkingDateTime {
  date: string;
  time: string;
  period: "AM" | "PM";
}

export class ParkingCalculatorPage {
  private readonly selectors = {
    parkingLot: "#ParkingLot",
    startingDate: "#StartingDate",
    startingTime: "#StartingTime",
    startingPeriod: 'input[name="StartingTimeAMPM"]',
    leavingDate: "#LeavingDate",
    leavingTime: "#LeavingTime",
    leavingPeriod: 'input[name="LeavingTimeAMPM"]',
    calculate: 'input[type="submit"]',
    resultLabel: "td",
    resultLabelText: /estimated parking costs/i,
    result: "td",
  };

  open(): Cypress.Chainable<Cypress.AUTWindow> {
    return cy.visit("/");
  }

  selectParking(parkingLot: ParkingLot): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.parkingLot).select(parkingLot);
  }

  fillEntry(entry: ParkingDateTime): Cypress.Chainable<JQuery<HTMLElement>> {
    cy.get(this.selectors.startingDate).clear().type(entry.date);
    cy.get(this.selectors.startingTime).clear().type(entry.time);
    return cy
      .get(`${this.selectors.startingPeriod}[value="${entry.period}"]`)
      .check();
  }

  fillLeaving(leaving: ParkingDateTime): Cypress.Chainable<JQuery<HTMLElement>> {
    cy.get(this.selectors.leavingDate).clear().type(leaving.date);
    cy.get(this.selectors.leavingTime).clear().type(leaving.time);
    return cy
      .get(`${this.selectors.leavingPeriod}[value="${leaving.period}"]`)
      .check();
  }

  calculate(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.calculate).click();
  }

  getResult(): Cypress.Chainable<JQuery<HTMLTableCellElement>> {
    return cy
      .contains<HTMLTableCellElement>(
        this.selectors.resultLabel,
        this.selectors.resultLabelText,
      )
      .next<HTMLTableCellElement>(this.selectors.result);
  }

  getAmount(): Cypress.Chainable<number> {
    return this.getResult()
      .invoke("text")
      .then((text) => {
        const match = text.match(/\$\s*(\d+(?:\.\d{2})?)/);
        // Missing monetary output must not be converted to a zero price.
        return match ? Number(match[1]) : Number.NaN;
      });
  }
}
