import type {
  ParkingDateTime,
  ParkingLot,
} from "../pages/ParkingCalculatorPage";

export interface ParkingInput {
  parkingLot: ParkingLot;
  entry: ParkingDateTime;
  leaving: ParkingDateTime;
}

export interface ParkingPriceScenario extends ParkingInput {
  title: string;
  expectedAmount: number;
}

const entry: ParkingDateTime = {
  date: "10/09/2026",
  time: "08:00",
  period: "AM",
};

const leavingAfterOneHour: ParkingDateTime = {
  date: "10/09/2026",
  time: "09:00",
  period: "AM",
};

const leavingAfterOneDay: ParkingDateTime = {
  date: "10/10/2026",
  time: "08:00",
  period: "AM",
};

const leavingAfterOneWeek: ParkingDateTime = {
  date: "10/16/2026",
  time: "08:00",
  period: "AM",
};

export const parkingPriceScenarios: readonly ParkingPriceScenario[] = [
  {
    title: "charges $12 for 5 hours of Valet Parking",
    parkingLot: "Valet",
    entry,
    leaving: { date: "10/09/2026", time: "01:00", period: "PM" },
    expectedAmount: 12,
  },
  {
    title: "charges $18 for more than 5 hours of Valet Parking",
    parkingLot: "Valet",
    entry,
    leaving: { date: "10/09/2026", time: "01:01", period: "PM" },
    expectedAmount: 18,
  },
  {
    title: "charges $3 for 90 minutes of Short-Term Parking",
    parkingLot: "Short",
    entry,
    leaving: { date: "10/09/2026", time: "09:30", period: "AM" },
    expectedAmount: 3,
  },
  {
    title: "caps a 24-hour Short-Term stay at $24",
    parkingLot: "Short",
    entry,
    leaving: leavingAfterOneDay,
    expectedAmount: 24,
  },
  {
    title: "charges $2 for 1 hour of Economy Parking",
    parkingLot: "Economy",
    entry,
    leaving: leavingAfterOneHour,
    expectedAmount: 2,
  },
  {
    title: "charges $9 for 24 hours of Economy Parking",
    parkingLot: "Economy",
    entry,
    leaving: leavingAfterOneDay,
    expectedAmount: 9,
  },
  {
    title: "charges $54 for 7 days of Economy Parking",
    parkingLot: "Economy",
    entry,
    leaving: leavingAfterOneWeek,
    expectedAmount: 54,
  },
  {
    title: "charges $2 for 1 hour of Long-Term Garage Parking",
    parkingLot: "Long-Garage",
    entry,
    leaving: leavingAfterOneHour,
    expectedAmount: 2,
  },
  {
    title: "charges $12 for 24 hours of Long-Term Garage Parking",
    parkingLot: "Long-Garage",
    entry,
    leaving: leavingAfterOneDay,
    expectedAmount: 12,
  },
  {
    title: "charges $72 for 7 days of Long-Term Garage Parking",
    parkingLot: "Long-Garage",
    entry,
    leaving: leavingAfterOneWeek,
    expectedAmount: 72,
  },
  {
    title: "charges $2 for 1 hour of Long-Term Surface Parking",
    parkingLot: "Long-Surface",
    entry,
    leaving: leavingAfterOneHour,
    expectedAmount: 2,
  },
  {
    title: "charges $10 for 24 hours of Long-Term Surface Parking",
    parkingLot: "Long-Surface",
    entry,
    leaving: leavingAfterOneDay,
    expectedAmount: 10,
  },
  {
    title: "charges $60 for 7 days of Long-Term Surface Parking",
    parkingLot: "Long-Surface",
    entry,
    leaving: leavingAfterOneWeek,
    expectedAmount: 60,
  },
];

export const invalidParkingInterval: ParkingInput = {
  parkingLot: "Valet",
  entry: { date: "10/09/2026", time: "10:00", period: "AM" },
  leaving: { date: "10/09/2026", time: "09:00", period: "AM" },
};
