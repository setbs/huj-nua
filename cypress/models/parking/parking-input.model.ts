import type { ParkingDateTime } from "./parking-date-time.model";

export type ParkingLot =
  "Valet" | "Short" | "Economy" | "Long-Garage" | "Long-Surface";

export interface ParkingInput {
  parkingLot: ParkingLot;
  entry: ParkingDateTime;
  leaving: ParkingDateTime;
}
