import { faker } from "@faker-js/faker";

import type { ParkingDateTime } from "../../models/parking/parking-date-time.model";
import type {
  ParkingInput,
  ParkingLot,
} from "../../models/parking/parking-input.model";
import type { ParkingPriceScenario } from "../../models/parking/parking-scenario.model";

const BASE_DATE = new Date(Date.UTC(2026, 9, 9, 8, 0));

export class ParkingFactory {
  static createDateTime(date: Date): ParkingDateTime {
    const hours = date.getUTCHours();

    return {
      date: [
        String(date.getUTCMonth() + 1).padStart(2, "0"),
        String(date.getUTCDate()).padStart(2, "0"),
        date.getUTCFullYear(),
      ].join("/"),
      time: [
        String(hours % 12 || 12).padStart(2, "0"),
        String(date.getUTCMinutes()).padStart(2, "0"),
      ].join(":"),
      period: hours >= 12 ? "PM" : "AM",
    };
  }

  static createInput(overrides: Partial<ParkingInput> = {}): ParkingInput {
    return {
      parkingLot: "Economy",
      entry: this.createDateTime(BASE_DATE),
      leaving: this.createDateTime(new Date(BASE_DATE.getTime() + 60 * 60_000)),
      ...overrides,
    };
  }

  static createScenario(
    parkingLot: ParkingLot,
    durationMinutes: number,
    expectedAmount: number,
    title: string,
  ): ParkingPriceScenario {
    const leavingDate = new Date(
      BASE_DATE.getTime() + durationMinutes * 60_000,
    );

    return {
      ...this.createInput({
        parkingLot,
        leaving: this.createDateTime(leavingDate),
      }),
      title,
      expectedAmount,
    };
  }

  static createInvalidInterval(): ParkingInput {
    return this.createInput({
      parkingLot: "Valet",
      entry: this.createDateTime(new Date(Date.UTC(2026, 9, 9, 10, 0))),
      leaving: this.createDateTime(new Date(Date.UTC(2026, 9, 9, 9, 0))),
    });
  }

  static createRandomInput(): ParkingInput {
    const parkingLot = faker.helpers.arrayElement<ParkingLot>([
      "Valet",
      "Short",
      "Economy",
      "Long-Garage",
      "Long-Surface",
    ]);
    const entryDate = faker.date.between({
      from: new Date(Date.UTC(2026, 9, 1)),
      to: new Date(Date.UTC(2026, 10, 30)),
    });
    const durationMinutes = faker.number.int({ min: 60, max: 10_080 });
    const leavingDate = new Date(
      entryDate.getTime() + durationMinutes * 60_000,
    );

    return this.createInput({
      parkingLot,
      entry: this.createDateTime(entryDate),
      leaving: this.createDateTime(leavingDate),
    });
  }
}
