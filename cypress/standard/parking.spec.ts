describe("Parking cost calculator", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("charges $12 for 5 hours of Valet Parking", () => {
    cy.get("#ParkingLot").select("Valet");

    cy.get("#StartingDate").clear().type("10/09/2026");
    cy.get("#StartingTime").clear().type("08:00");
    cy.get('input[name="StartingTimeAMPM"][value="AM"]').check();

    cy.get("#LeavingDate").clear().type("10/09/2026");
    cy.get("#LeavingTime").clear().type("01:00");
    cy.get('input[name="LeavingTimeAMPM"][value="PM"]').check();

    cy.get('input[type="submit"]').click();


   cy.contains("td", /estimated parking costs/i)
  .next("td")
  .invoke("text")
  .then((text) => {
    const amount = text
      .split("(")[0]
      .replace("$", "")
      .trim();

    expect(Number(amount)).to.equal(12);
  });	

  });


it("charges $3 for 90 minutes of Short-Term Parking", () => {
  cy.get("#ParkingLot").select("Short");

  cy.get("#StartingDate").clear().type("10/09/2026");
  cy.get("#StartingTime").clear().type("08:00");
  cy.get('input[name="StartingTimeAMPM"][value="AM"]').check();

  cy.get("#LeavingDate").clear().type("10/09/2026");
  cy.get("#LeavingTime").clear().type("09:30");
  cy.get('input[name="LeavingTimeAMPM"][value="AM"]').check();

  cy.get('input[type="submit"]').click();

  cy.contains("td", /estimated parking costs/i)
    .next("td")
    .invoke("text")
    .then((text) => {
      const amount = text
        .split("(")[0]
        .replace("$", "")
        .trim();

      expect(Number(amount)).to.equal(3);
    });
});

it("[BUG-01] rejects a leaving time earlier than the entry time", () => {
  cy.get("#ParkingLot").select("Valet");

  cy.get("#StartingDate").clear().type("10/09/2026");
  cy.get("#StartingTime").clear().type("10:00");
  cy.get('input[name="StartingTimeAMPM"][value="AM"]').check();

  cy.get("#LeavingDate").clear().type("10/09/2026");
  cy.get("#LeavingTime").clear().type("09:00");
  cy.get('input[name="LeavingTimeAMPM"][value="AM"]').check();

  cy.get('input[type="submit"]').click();

  // Invalid input should produce a validation error, not a price.
  cy.contains("td", /estimated Parking costs/i)
    .next("td")
    .should("not.contain", "$");
});
it("charges $18 for more than 5 hours of Valet Parking", () => {
  cy.get("#ParkingLot").select("Valet");

  cy.get("#StartingDate").clear().type("10/09/2026");
  cy.get("#StartingTime").clear().type("08:00");
  cy.get('input[name="StartingTimeAMPM"][value="AM"]').check();

  cy.get("#LeavingDate").clear().type("10/09/2026");
  cy.get("#LeavingTime").clear().type("01:01");
  cy.get('input[name="LeavingTimeAMPM"][value="PM"]').check();

  cy.get('input[type="submit"]').click();

  cy.contains("td", /estimated parking costs/i)
    .next("td")
    .invoke("text")
    .then((text) => {
      const amount = text.split("(")[0].replace("$", "").trim();
      expect(Number(amount)).to.equal(18);
    });
});

  it("caps a 24-hour Short-Term stay at $24", () => {
  cy.get("#ParkingLot").select("Short");

  cy.get("#StartingDate").clear().type("10/09/2026");
  cy.get("#StartingTime").clear().type("08:00");
  cy.get('input[name="StartingTimeAMPM"][value="AM"]').check();

  cy.get("#LeavingDate").clear().type("10/10/2026");
  cy.get("#LeavingTime").clear().type("08:00");
  cy.get('input[name="LeavingTimeAMPM"][value="AM"]').check();

  cy.get('input[type="submit"]').click();

  cy.contains("td", /estimated parking costs/i)
    .next("td")
    .invoke("text")
    .then((text) => {
      const amount = text.split("(")[0].replace("$", "").trim();
      expect(Number(amount)).to.equal(24);
    });
});
const additionalLots = [
  {
    name: "Economy Parking",
    value: "Economy",
    daily: 9,
    weekly: 54,
  },
  {
    name: "Long-Term Garage Parking",
    value: "Long-Garage",
    daily: 12,
    weekly: 72,
  },
  {
    name: "Long-Term Surface Parking",
    value: "Long-Surface",
    daily: 10,
    weekly: 60,
  },
];

additionalLots.forEach((lot) => {
  const scenarios = [
    {
      name: "1 hour",
      leavingDate: "10/09/2026",
      leavingTime: "09:00",
      expected: 2,
    },
    {
      name: "24 hours",
      leavingDate: "10/10/2026",
      leavingTime: "08:00",
      expected: lot.daily,
    },
    {
      name: "7 days",
      leavingDate: "10/16/2026",
      leavingTime: "08:00",
      expected: lot.weekly,
    },
  ];

  scenarios.forEach((scenario) => {
    it(`charges $${scenario.expected} for ${scenario.name} of ${lot.name}`, () => {
      cy.get("#ParkingLot").select(lot.value);

      cy.get("#StartingDate").clear().type("10/09/2026");
      cy.get("#StartingTime").clear().type("08:00");
      cy.get('input[name="StartingTimeAMPM"][value="AM"]').check();

      cy.get("#LeavingDate").clear().type(scenario.leavingDate);
      cy.get("#LeavingTime").clear().type(scenario.leavingTime);
      cy.get('input[name="LeavingTimeAMPM"][value="AM"]').check();

      cy.get('input[type="submit"]').click();

      cy.contains("td", /estimated parking costs/i)
        .next("td")
        .invoke("text")
        .then((text) => {
          const amount = text
            .split("(")[0]
            .replace("$", "")
            .trim();

          expect(Number(amount)).to.equal(scenario.expected);
        });
    });
  });
});
});

