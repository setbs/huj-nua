# Running and submitting the assessment

The suite uses Cypress 13.4.0, TypeScript 5.2.2, and dotenv 16.3.1. Cypress and TypeScript retain the original assessment versions. Use Node.js 20; the original task recommends 20.9.0.

From a configured repository root:

```sh
npm ci
cp .env.example .env
npm run check
npm run test:assessment
```

`test:assessment` runs only `cypress/e2e/parking-calculator.cy.ts`. The equivalent direct command is:

```sh
npx cypress run --spec "cypress/e2e/parking-calculator.cy.ts"
```

The configuration loads `.env` through dotenv and passes `PARKING_BASE_URL` to `e2e.baseUrl`. `.env.example` supplies the public application URL. A missing or empty variable stops Cypress with a useful error; no login or password is required.

The expected result is **14 tests: 13 passing / 1 failing**. This was confirmed after the refactor on 9 October 2026 in headless Electron 114, with no pending or skipped tests. The 13 pricing tests cover all five parking types. The active `[BUG-01]` test fills Valet entry `10/09/2026 10:00 AM` and leaving `10/09/2026 09:00 AM`, submits the form, and asserts that the result contains no `$`. The application currently returns `$0.00` with a negative duration, so the test fails at the result assertion. It is intentionally active, and a non-zero test exit code is expected while the bug remains. [Validation details](assessment/VALIDATION.md) record completed checks, the browser run, and the failure screenshot.

## Code checks

```sh
npm run check
```

This runs TypeScript checking, ESLint, and Prettier's formatting check in sequence; all three passed after the refactor. Individual commands are `npm run typecheck`, `npm run lint`, and `npm run format:check`. Use `npm run lint:fix` for automatic lint fixes and `npm run format` to apply formatting. Root `eslint.config.mjs`, `.prettierrc.json`, and `.prettierignore` define the shared rules.

## Structure

- `e2e/parking-calculator.cy.ts`: registers the 14 scenarios and owns all assertions and expected-result comparisons.
- `models/parking/`: three TypeScript models define date/time values, parking inputs, and price scenarios independently of the UI.
- `factories/parking/parking.factory.ts`: builds inputs and scenarios from the fixed `10/09/2026 08:00 AM` baseline using UTC date arithmetic. The optional Faker helper generates exploratory inputs; the regression suite uses only deterministic factory methods.
- `fixtures/parking/parking-price.scenarios.ts`: holds the 13 pricing cases and their expected amounts. Synchronous imports make scenarios available when Mocha registers the tests.
- `fixtures/pages.fixture.ts`: a central Page Manager lazily creates the `ParkingCalculatorPage` instance used by tests.
- `pages/ParkingCalculatorPage.ts`: groups entry/leaving selectors, fills the form through `fillParkingDetails()` and a shared private `fillDateTime()`, submits Calculate, and exposes result/amount accessors. Methods return Cypress chains. Unreadable amounts produce a descriptive error; expected prices and assertions stay in tests.
- `support/commands.ts`: the minimal Cypress support entry.
- `evidence/`: preserved manual screenshots for BUG-01, BUG-02, and BUG-03.
- `results/screenshots/`: the automated BUG-01 failure screenshot.
- `assessment/`: the original assignment and the three bug reports with approach and next steps.

Configuration and dependencies live in the project root: `.env.example`, `.gitignore`, `cypress.config.ts`, `package.json`, `package-lock.json`, `tsconfig.json`, `eslint.config.mjs`, `.prettierrc.json`, and `.prettierignore`.

Each test opens a fresh page. Models define the data contract; the factory creates inputs; fixtures name the cases and specify expected amounts; the Page Manager supplies the page object; tests decide what must be true. This keeps data generation independent of selectors and avoids repeating form interactions. Cypress queues the commands returned by page methods and retries element queries and assertions without fixed waits, forced interactions, or suppressed application exceptions.

## Restoring the ZIP in the original repository

The submission archive is `Stanislav_Diachuk_QA_Assessment.zip`, containing only the `cypress` folder. Replace the original demonstration `cypress` directory with the archived directory. Save the old folder outside the repository first if needed. Simply merging directories leaves the removed Gherkin examples behind, and their deleted dependencies would break type checking.

The nine root setup files are supplied separately in `Stanislav_Diachuk_QA_Assessment_Setup.zip`. Extract that archive into the repository root, replacing the original `.env.example`, `.gitignore`, `cypress.config.ts`, `package.json`, `package-lock.json`, `tsconfig.json`, `eslint.config.mjs`, `.prettierrc.json`, and `.prettierignore`, then run:

```sh
npm ci
cp .env.example .env
npm run check
npm run test:assessment
```

The root configuration removes the unused Cucumber/report pipeline and uses Cypress's built-in TypeScript preprocessing. Use the submitted `package-lock.json` with `npm ci` to install the locked versions. The `cypress` archive alone does not include these root files; use both archives when restoring the refactored setup outside this repository.

The setup archive includes `.env.example`; neither archive contains a real `.env` or `node_modules`. The application is public and the example URL is sufficient for this assessment.
