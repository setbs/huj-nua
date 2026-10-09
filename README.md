# Parking calculator QA assessment

Cypress 13.4.0 and TypeScript 5.2.2 tests for <https://www.shino.de/parkcalc/>. The assessment covers all five parking types with 13 pricing scenarios and one active regression test for BUG-01.

Use Node.js 20 (the original task recommends 20.9.0), then run from the repository root:

```sh
npm ci
cp .env.example .env
npm run check
npm run test:assessment
```

`.env` must define `PARKING_BASE_URL`. The supplied example contains the public application URL; no authentication is required. A missing or empty URL produces a clear configuration error.

The refactored suite was verified on 9 October 2026 in headless Electron 114: **14 tests: 13 passing / 1 failing**, with BUG-01 as the only failure. `npm run check` passed TypeScript, ESLint, and Prettier checks. BUG-01 stays red because a leaving time before entry must not produce a monetary estimate, but the application displays `$0.00`. The test asserts correct behavior and the suite exits with a non-zero code while the bug remains. [Validation details](cypress/assessment/VALIDATION.md) record completed checks and the browser run.

[cypress/README.md](cypress/README.md) explains the models, factory, fixtures, Page Object, and Page Manager, plus linting, formatting, and ZIP setup. Configuration and dependency files live only in the repository root. `Stanislav_Diachuk_QA_Assessment.zip` contains the `cypress` folder; `Stanislav_Diachuk_QA_Assessment_Setup.zip` contains the nine required root setup files. Extract both into the same project directory for a reproducible run. [Bug reports](cypress/assessment/BUG_REPORTS.md), [original assignment](cypress/assessment/ASSIGNMENT.md), and screenshots are included inside `cypress`.
