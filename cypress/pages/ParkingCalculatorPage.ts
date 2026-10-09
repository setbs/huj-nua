import type { ParkingDateTime } from "../models/parking/parking-date-time.model";
import type {
  ParkingInput,
  ParkingLot,
} from "../models/parking/parking-input.model";

type DateTimeField = "starting" | "leaving";

export class ParkingCalculatorPage {
  private readonly selectors = {
    form: 'form[name="Calculator"]',
    parkingLot: "#ParkingLot",
    starting: {
      date: "#StartingDate",
      time: "#StartingTime",
      period: 'input[name="StartingTimeAMPM"]',
    },
    leaving: {
      date: "#LeavingDate",
      time: "#LeavingTime",
      period: 'input[name="LeavingTimeAMPM"]',
    },
    calculateButton: 'input[type="submit"][value="Calculate"]',
    resultCell: "td",
    resultAmount: "span.SubHead > b",
  } as const;

  open(): Cypress.Chainable<Cypress.AUTWindow> {
    return cy.visit("/");
  }

  selectParking(
    parkingLot: ParkingLot,
  ): Cypress.Chainable<JQuery<HTMLSelectElement>> {
    return cy
      .get<HTMLSelectElement>(this.selectors.parkingLot)
      .select(parkingLot);
  }

  private fillDateTime(
    field: DateTimeField,
    value: ParkingDateTime,
  ): Cypress.Chainable<JQuery<HTMLInputElement>> {
    const selectors = this.selectors[field];

    cy.get<HTMLInputElement>(selectors.date).clear().type(value.date);
    cy.get<HTMLInputElement>(selectors.time).clear().type(value.time);

    return cy
      .get<HTMLInputElement>(`${selectors.period}[value="${value.period}"]`)
      .check();
  }

  fillEntry(
    entry: ParkingDateTime,
  ): Cypress.Chainable<JQuery<HTMLInputElement>> {
    return this.fillDateTime("starting", entry);
  }

  fillLeaving(
    leaving: ParkingDateTime,
  ): Cypress.Chainable<JQuery<HTMLInputElement>> {
    return this.fillDateTime("leaving", leaving);
  }

  fillParkingDetails(
    input: ParkingInput,
  ): Cypress.Chainable<JQuery<HTMLInputElement>> {
    this.selectParking(input.parkingLot);
    this.fillEntry(input.entry);

    return this.fillLeaving(input.leaving);
  }

  calculate(): Cypress.Chainable<JQuery<HTMLInputElement>> {
    return cy
      .get<HTMLFormElement>(this.selectors.form)
      .find<HTMLInputElement>(this.selectors.calculateButton)
      .click();
  }

  getResult(): Cypress.Chainable<JQuery<HTMLTableCellElement>> {
    return cy
      .get<HTMLFormElement>(this.selectors.form)
      .contains<HTMLTableCellElement>(
        this.selectors.resultCell,
        /estimated parking costs/i,
      )
      .next<HTMLTableCellElement>(this.selectors.resultCell);
  }

  getAmount(): Cypress.Chainable<number> {
    return this.getResult().then(($result) => {
      const text = $result.find(this.selectors.resultAmount).text().trim();
      const match = text.match(/^\$\s*(\d+(?:\.\d{2})?)$/);

      if (!match) {
        throw new Error(
          `Unable to parse parking amount from "${text || $result.text().trim()}": expected a complete dollar amount.`,
        );
      }

      const amount = Number(match[1]);

      if (!Number.isFinite(amount)) {
        throw new Error(`Parking amount is not a finite number: "${text}".`);
      }

      return amount;
    });
  }
}
