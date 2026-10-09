# Running and submitting the assessment

The suite uses Cypress 13.4.0, TypeScript 5.2.2, and dotenv 16.3.1. Cypress and TypeScript retain the original assessment versions. Use Node.js 20; the original task recommends 20.9.0.

From a configured repository root:

```sh
npm ci
cp .env.example .env
npm run typecheck
npm run test:assessment
```

`test:assessment` runs only `cypress/standard/parking.spec.ts`. The equivalent direct command is:

```sh
npx cypress run --spec "cypress/standard/parking.spec.ts"
```

The configuration loads `.env` through dotenv and passes `PARKING_BASE_URL` to `e2e.baseUrl`. `.env.example` supplies the public application URL. A missing or empty variable stops Cypress with a useful error; no login or password is required.

The expected result is **14 tests: 13 passing / 1 failing**. This was confirmed on 9 October 2026 in headless Electron, and TypeScript checking passed. The 13 pricing tests cover all five parking types. The active `[BUG-01]` test fills Valet entry `10/09/2026 10:00 AM` and leaving `10/09/2026 09:00 AM`, submits the form, and asserts that the result contains no `$`. The application currently returns `$0.00` with a negative duration, so the test fails at the result assertion. It is intentionally active, and a non-zero test exit code is expected while the bug remains. [Validation details](assessment/VALIDATION.md) include the command and updated failure screenshot.

## Structure

- `standard/parking.spec.ts`: registers the 14 scenarios and owns all assertions and expected-result comparisons.
- `pages/ParkingCalculatorPage.ts`: owns form/result selectors and Cypress operations for opening the page, choosing a lot, entering dates/times and AM/PM, calculating, and reading the result/amount. Operations return Cypress chains; the page object contains no expected prices or assertions.
- `fixtures/parkingScenarios.ts`: typed TypeScript fixtures hold fixed `MM/DD/YYYY` inputs and expected amounts. They are imported synchronously so scenarios are available when Mocha registers the tests.
- `support/e2e.ts`: the standard Cypress support entry.
- `evidence/`: preserved manual screenshots for BUG-01, BUG-02, and BUG-03.
- `results/screenshots/`: the automated BUG-01 failure screenshot.
- `assessment/`: the original assignment and the three bug reports with approach and next steps.

Configuration and dependencies live in the project root: `.env.example`, `.gitignore`, `cypress.config.ts`, `package.json`, `package-lock.json`, and `tsconfig.json`.

Each test opens a fresh page. The Page Object centralizes how to operate the UI, fixtures describe the scenarios, and tests explain what must be true. Cypress retries element queries and assertions without fixed waits, forced interactions, or suppressed application exceptions.

## Restoring the ZIP in the original repository

The submission archive is `Stanislav_Diachuk_QA_Assessment.zip`, containing only the `cypress` folder. Replace the original demonstration `cypress` directory with the archived directory. Save the old folder outside the repository first if needed. Simply merging directories leaves the removed Gherkin examples behind, and their deleted dependencies would break type checking.

The six root setup files are supplied separately in `Stanislav_Diachuk_QA_Assessment_Setup.zip`. Extract that archive into the repository root, replacing the original `.env.example`, `.gitignore`, `cypress.config.ts`, `package.json`, `package-lock.json`, and `tsconfig.json`, then run:

```sh
npm ci
cp .env.example .env
npm run typecheck
npm run test:assessment
```

The root configuration removes the unused Cucumber/report pipeline and uses Cypress's built-in TypeScript preprocessing. Use the submitted `package-lock.json` with `npm ci` to install the locked versions. The `cypress` archive alone does not include these root files; use both archives when restoring the refactored setup outside this repository.

The setup archive includes `.env.example`; neither archive contains a real `.env` or `node_modules`. The application is public and the example URL is sufficient for this assessment.
