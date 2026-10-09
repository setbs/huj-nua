import { ParkingCalculatorPage } from "../pages/ParkingCalculatorPage";

class PageManager {
  private _parkingCalculator?: ParkingCalculatorPage;

  get parkingCalculator(): ParkingCalculatorPage {
    return (this._parkingCalculator ??= new ParkingCalculatorPage());
  }
}

export const pages = new PageManager();
