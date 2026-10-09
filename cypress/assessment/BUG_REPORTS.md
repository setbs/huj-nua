# Parking calculator QA assessment — bug reports

Author: Stanislav Diachuk

Manual testing environment: Manjaro Linux 26.1.2, Mozilla Firefox 157.0.1. Automation: Cypress 13.4.0 with TypeScript. Application: <https://www.shino.de/parkcalc/>. Date tested: 9 October 2026. Dates below use `MM/DD/YYYY`.

## BUG-01 — Calculator accepts a leaving time earlier than the entry time

Severity: Medium — an invalid parking interval produces a misleading estimate.

Steps to reproduce:

1. Open the calculator and select Valet Parking.
2. Set entry to `10/09/2026` at `10:00 AM`.
3. Set leaving to `10/09/2026` at `09:00 AM`.
4. Click Calculate.

Expected: Reject the interval and display a validation message explaining that leaving cannot precede entry.

Actual: Displays `$0.00` and a duration of “-1 Days, 23 Hours, 0 Minutes”.

The active automated test labelled `[BUG-01]` checks that this invalid interval produces no monetary estimate. Its result assertion fails while the application displays a price. The test does not skip the scenario or accept the bug as correct behavior.

Manual evidence: [BUG-01.png](../evidence/BUG-01.png). The automated failure screenshot is retained in `../results/screenshots/parking.spec.ts/`.

## BUG-02 — Calculator accepts a nonexistent calendar date

Severity: Medium — invalid date input is accepted and produces an estimate.

Steps to reproduce:

1. Open the calculator and select Valet Parking.
2. Set entry to `02/30/2026` at `10:00 AM`.
3. Set leaving to `03/02/2026` at `10:00 AM`.
4. Click Calculate.

Expected: Reject February 30 and display a date validation message without calculating a price.

Actual: Displays `$12.00` and a duration of “0 Days, 0 Hours, 0 Minutes”.

Manual evidence: [BUG-02.png](../evidence/BUG-02.png).

## BUG-03 — Calculator accepts minutes outside the valid range

Severity: Medium — invalid time input is accepted and produces an estimate.

Steps to reproduce:

1. Open the calculator and select Valet Parking.
2. Set entry to `10/09/2026` at `10:75 AM`.
3. Set leaving to `10/09/2026` at `11:30 AM`.
4. Click Calculate.

Expected: Reject the entry time because minutes must be between `00` and `59`, and display a validation message without calculating a price.

Actual: Accepts the invalid time and displays `$12.00` and a duration of “0 Days, 0 Hours, 15 Minutes”.

This report concerns input validation rather than the `$12` Valet rate. No requirement permitting automatic normalisation of invalid times was provided. BUG-02 and BUG-03 cover different invalid input classes; they may share an underlying validation issue, but the root cause has not been confirmed.

Manual evidence: [BUG-03.png](../evidence/BUG-03.png).

## Automation approach and results

The suite contains 14 independent tests covering all five parking types. Expected costs come from the displayed parking rates. Coverage includes:

- Valet pricing at five hours and five hours one minute.
- Short-Term pricing for 90 minutes and the 24-hour maximum.
- One-hour, 24-hour, and seven-day stays for Economy, Long-Term Garage, and Long-Term Surface parking.
- The correct-behavior regression test demonstrating BUG-01.

`ParkingCalculatorPage` centralizes selectors and form interactions. Typed fixtures supply fixed dates, times, lot values, and expected prices. The test file keeps the assertions and imports fixture data synchronously to register the scenarios. Every test begins with a fresh page visit; Cypress chains provide automatic waiting and retrying.

The refactored suite was run on 9 October 2026: **14 tests, 13 passing / 1 failing**, with BUG-01 as the only failure at the result assertion. TypeScript checking passed. A non-zero exit code is expected until the application rejects invalid intervals. The supplied evidence is preserved alongside the new failure screenshot. [Validation details](VALIDATION.md) record the actual run; [run and ZIP setup instructions](../README.md) explain how to reproduce the suite.

## Next steps

With more time, I would extend coverage around hourly rounding, daily and weekly boundaries, overnight and multi-week stays, and additional invalid inputs. I would automate BUG-02 and BUG-03 and verify the suite across additional browsers. The current Page Object and fixtures provide a shared structure for that work.
