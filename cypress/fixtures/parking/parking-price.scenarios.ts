import { ParkingFactory } from "../../factories/parking/parking.factory";
import type { ParkingInput } from "../../models/parking/parking-input.model";
import type { ParkingPriceScenario } from "../../models/parking/parking-scenario.model";

export const parkingPriceScenarios: readonly ParkingPriceScenario[] = [
  ParkingFactory.createScenario(
    "Valet",
    300,
    12,
    "charges $12 for 5 hours of Valet Parking",
  ),
  ParkingFactory.createScenario(
    "Valet",
    301,
    18,
    "charges $18 for more than 5 hours of Valet Parking",
  ),
  ParkingFactory.createScenario(
    "Short",
    90,
    3,
    "charges $3 for 90 minutes of Short-Term Parking",
  ),
  ParkingFactory.createScenario(
    "Short",
    1440,
    24,
    "caps a 24-hour Short-Term stay at $24",
  ),
  ParkingFactory.createScenario(
    "Economy",
    60,
    2,
    "charges $2 for 1 hour of Economy Parking",
  ),
  ParkingFactory.createScenario(
    "Economy",
    1440,
    9,
    "charges $9 for 24 hours of Economy Parking",
  ),
  ParkingFactory.createScenario(
    "Economy",
    10_080,
    54,
    "charges $54 for 7 days of Economy Parking",
  ),
  ParkingFactory.createScenario(
    "Long-Garage",
    60,
    2,
    "charges $2 for 1 hour of Long-Term Garage Parking",
  ),
  ParkingFactory.createScenario(
    "Long-Garage",
    1440,
    12,
    "charges $12 for 24 hours of Long-Term Garage Parking",
  ),
  ParkingFactory.createScenario(
    "Long-Garage",
    10_080,
    72,
    "charges $72 for 7 days of Long-Term Garage Parking",
  ),
  ParkingFactory.createScenario(
    "Long-Surface",
    60,
    2,
    "charges $2 for 1 hour of Long-Term Surface Parking",
  ),
  ParkingFactory.createScenario(
    "Long-Surface",
    1440,
    10,
    "charges $10 for 24 hours of Long-Term Surface Parking",
  ),
  ParkingFactory.createScenario(
    "Long-Surface",
    10_080,
    60,
    "charges $60 for 7 days of Long-Term Surface Parking",
  ),
];

export const invalidParkingInterval: ParkingInput =
  ParkingFactory.createInvalidInterval();
