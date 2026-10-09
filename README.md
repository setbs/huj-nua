# Parking calculator QA assessment

Cypress 13.4.0 and TypeScript 5.2.2 tests for <https://www.shino.de/parkcalc/>. The assessment covers all five parking types with 13 pricing scenarios and one active regression test for BUG-01.

Use Node.js 20 (the original task recommends 20.9.0), then run from the repository root:

```sh
npm ci
cp .env.example .env
npm run typecheck
npm run test:assessment
```

`.env` must define `PARKING_BASE_URL`. The supplied example contains the public application URL; no authentication is required. A missing or empty URL produces a clear configuration error.

The verified result on 9 October 2026 is **14 tests: 13 passing / 1 failing**, with TypeScript checking also passing. BUG-01 stays red because a leaving time before entry must not produce a monetary estimate, but the application displays `$0.00`. The test asserts correct behavior and the suite exits with a non-zero code while the bug remains. [Validation details](cypress/assessment/VALIDATION.md) record the browser, command, and failure location.

[cypress/README.md](cypress/README.md) explains the Page Object and fixtures structure, the assessment-only command, and ZIP setup. Configuration and dependency files live only in the repository root. `Stanislav_Diachuk_QA_Assessment.zip` contains the `cypress` folder; `Stanislav_Diachuk_QA_Assessment_Setup.zip` contains the six required root setup files. Extract both into the same project directory for a reproducible run. [Bug reports](cypress/assessment/BUG_REPORTS.md), [original assignment](cypress/assessment/ASSIGNMENT.md), and screenshots are included inside `cypress`.
