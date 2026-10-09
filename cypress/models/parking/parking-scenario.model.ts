import type { ParkingInput } from "./parking-input.model";

export interface ParkingPriceScenario extends ParkingInput {
  title: string;
  expectedAmount: number;
}
