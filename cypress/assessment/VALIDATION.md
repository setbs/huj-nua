# Validation — 9 October 2026

The models/factory/Page Manager refactor ran against the public application using `PARKING_BASE_URL` from `.env`.

- Dependencies: a clean `npm ci` completed with the updated lockfile. Cypress 13.4.0, TypeScript 5.2.2, and dotenv 16.3.1 remain unchanged. Faker 9.9.0, ESLint 9.39.5, typescript-eslint 8.71.1, and Prettier 3.9.9 were added. The lockfile includes the shared dependency versions required by the new tools.
- Code checks: `npm run check` passed, including strict TypeScript checking, ESLint with zero warnings allowed, and Prettier's formatting check.
- Data: all 13 generated pricing fixtures and BUG-01 input were compared with the original fixed fixtures and matched exactly. UTC and America/New_York runs also verified midnight/noon formatting, independent default inputs, and reproducible seeded Faker generation.
- Parsing: valid prices were extracted; absent, malformed, partial, and non-finite monetary values produced descriptive errors.
- Configuration: absent, empty, and whitespace-only `PARKING_BASE_URL` values were checked against the transpiled configuration and rejected with the required-variable message.
- Browser: Electron 114, headless, Cypress 13.4.0. Host Node.js: 26.8.1; npm: 12.0.2. The original assignment recommends Node.js 20.9.0.
- Assessment: `cypress/e2e/parking-calculator.cy.ts`, 14 tests, **13 passing / 1 failing**, 0 pending, 0 skipped; duration 30 seconds. Exit code: 1, as expected for active BUG-01.

The host sets the Electron development variable `ELECTRON_RUN_AS_NODE`, which prevented the initial browser launch. The completed run used:

```sh
env -u ELECTRON_RUN_AS_NODE npm run test:assessment
```

Use the ordinary `npm run test:assessment` command on hosts without that variable. No test or application behavior was changed to accommodate the host.

The only failing test was `[BUG-01] rejects a leaving time earlier than the entry time`. All form actions completed, and failure occurred at the result assertion, independently of the monetary parser:

```text
AssertionError: Timed out retrying after 4000ms: expected '<td>' not to contain '$'
```

The new screenshot is `results/screenshots/parking-calculator.cy.ts/Parking cost calculator -- [BUG-01] rejects a leaving time earlier than the entry time (failed).png`. It shows `$0.00` and `-1 Days, 23 Hours, 0 Minutes`. The previous automated evidence and all three manual screenshots remain preserved.
