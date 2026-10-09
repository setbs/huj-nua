import {
  invalidParkingInterval,
  parkingPriceScenarios,
} from "../fixtures/parkingScenarios";
import { ParkingCalculatorPage } from "../pages/ParkingCalculatorPage";

describe("Parking cost calculator", () => {
  const parkingCalculator = new ParkingCalculatorPage();

  beforeEach(() => {
    parkingCalculator.open();
  });

  parkingPriceScenarios.forEach((scenario) => {
    it(scenario.title, () => {
      parkingCalculator.selectParking(scenario.parkingLot);
      parkingCalculator.fillEntry(scenario.entry);
      parkingCalculator.fillLeaving(scenario.leaving);
      parkingCalculator.calculate();

      parkingCalculator.getAmount().should("equal", scenario.expectedAmount);
    });
  });

  it("[BUG-01] rejects a leaving time earlier than the entry time", () => {
    parkingCalculator.selectParking(invalidParkingInterval.parkingLot);
    parkingCalculator.fillEntry(invalidParkingInterval.entry);
    parkingCalculator.fillLeaving(invalidParkingInterval.leaving);
    parkingCalculator.calculate();

    parkingCalculator.getResult().should("not.contain", "$");
  });
});
