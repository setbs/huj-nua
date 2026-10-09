import { pages } from "../fixtures/pages.fixture";
import {
  invalidParkingInterval,
  parkingPriceScenarios,
} from "../fixtures/parking/parking-price.scenarios";

describe("Parking cost calculator", () => {
  beforeEach(() => {
    pages.parkingCalculator.open();
  });

  parkingPriceScenarios.forEach((scenario) => {
    it(scenario.title, () => {
      pages.parkingCalculator.fillParkingDetails(scenario);
      pages.parkingCalculator.calculate();

      pages.parkingCalculator
        .getAmount()
        .should("equal", scenario.expectedAmount);
    });
  });

  it("[BUG-01] rejects a leaving time earlier than the entry time", () => {
    pages.parkingCalculator.fillParkingDetails(invalidParkingInterval);
    pages.parkingCalculator.calculate();

    pages.parkingCalculator.getResult().should("not.contain", "$");
  });
});
