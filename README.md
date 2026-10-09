Hello Hanna,

Please find attached my completed QA automation assessment, including the Cypress test suite and screenshot evidence.

Below are my three bug reports, testing approach, and proposed next steps.

Testing environment

    Manjaro Linux 26.1.2

    Mozilla Firefox 157.0.1 for manual testing

    Cypress 13.4.0

    Application: https://www.shino.de/parkcalc/

    Date tested: 9 October 2026

    Dates below use MM/DD/YYYY.

BUG-01 — Calculator accepts a leaving time earlier than the entry time

Severity: Medium — an invalid parking interval produces a misleading estimate.

Steps to reproduce:

    Open the calculator and select Valet Parking.

    Set entry to 10/09/2026 at 10:00 AM.

    Set leaving to 10/09/2026 at 09:00 AM.

    Click Calculate.

Expected: Reject the interval and display a validation message explaining that leaving cannot precede entry.

Actual: Displays $0.00 and a duration of “-1 Days, 23 Hours, 0 Minutes”.

The automated test labelled [BUG-01] reproduces this issue. It checks that an invalid interval does not produce a monetary estimate and currently fails because a price is displayed.

BUG-02 — Calculator accepts a nonexistent calendar date

Severity: Medium — invalid date input is accepted and produces an estimate.

Steps to reproduce:

    Open the calculator and select Valet Parking.

    Set entry to 02/30/2026 at 10:00 AM.

    Set leaving to 03/02/2026 at 10:00 AM.

    Click Calculate.

Expected: Reject February 30 and display a date validation message without calculating a price.

Actual: Displays $12.00 and a duration of “0 Days, 0 Hours, 0 Minutes”.

BUG-03 — Calculator accepts minutes outside the valid range

Severity: Medium — invalid time input is accepted and produces an estimate.

Steps to reproduce:

    Open the calculator and select Valet Parking.

    Set entry to 10/09/2026 at 10:75 AM.

    Set leaving to 10/09/2026 at 11:30 AM.

    Click Calculate.

Expected: Reject the entry time because minutes must be between 00 and 59, and display a validation message without calculating a price.

Actual: Accepts the invalid time and displays $12.00 and a duration of “0 Days, 0 Hours, 15 Minutes”.

This report concerns input validation, rather than the $12 Valet rate. No requirement permitting automatic normalisation of invalid times was provided.

BUG-02 and BUG-03 cover different invalid input classes. They may share an underlying validation issue, but the root cause has not been confirmed. Manual screenshot evidence is included in cypress/evidence.

Automation approach and results

I used standard Cypress syntax with TypeScript and retained the existing repository configuration.

The suite contains 14 independent tests covering all five parking types. Expected costs are calculated from the displayed parking rates. Coverage includes:

    Valet pricing at five hours and five hours one minute.

    Short-Term pricing for 90 minutes and the 24-hour maximum.

    One-hour, 24-hour and seven-day stays for Economy, Long-Term Garage and Long-Term Surface parking.

    A regression test demonstrating BUG-01.

Each test starts with a fresh page visit. Repeated scenarios for the three additional parking types are parameterised. Tests use element IDs and form attributes, without fixed waits.

The final headless run completed with 13 passing tests and one failing test. The single failure demonstrates BUG-01, as requested by the assessment. Its failure screenshot is included in cypress/results/screenshots.

To run the submitted suite, extract the attached cypress folder into the original repository, install dependencies using npm install, and run:

npx cypress run --spec "cypress/standard/parking.spec.ts"

A non-zero exit code is expected while BUG-01 remains unresolved.

Next steps

With more time, I would extend coverage around hourly rounding, daily and weekly boundaries, overnight and multi-week stays, and additional invalid inputs. I would also automate BUG-02 and BUG-03, extract reusable form helpers, and verify the suite across additional browsers.

Thank you for the opportunity. I would be happy to discuss the findings and my approach at interview.

Kind regards,
Stanislav Diachuk
