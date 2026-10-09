# Validation — 9 October 2026

The refactored assessment ran against the public application using `PARKING_BASE_URL` from `.env`.

- Dependency installation: `npm ci` completed using the submitted lockfile. Cypress remains 13.4.0 and TypeScript remains 5.2.2; all retained package versions match the original lockfile.
- TypeScript: `npm run typecheck` passed with strict checking and no emitted files.
- Configuration: absent, empty, and whitespace-only `PARKING_BASE_URL` values were checked against the transpiled configuration and rejected with the required-variable message.
- Browser: Electron 114, headless, Cypress 13.4.0. Host Node.js: 26.8.1; npm: 12.0.2. The original assignment recommends Node.js 20.9.0.
- Assessment: 14 tests, **13 passing / 1 failing**, 0 pending, 0 skipped; duration 31 seconds. Exit code: 1, as expected for active BUG-01.

The host sets the Electron development variable `ELECTRON_RUN_AS_NODE`, which prevented the initial browser launch. The completed run used:

```sh
env -u ELECTRON_RUN_AS_NODE npm run test:assessment
```

Use the ordinary `npm run test:assessment` command on hosts without that variable. No test or application behavior was changed to accommodate the host.

The only failing test was `[BUG-01] rejects a leaving time earlier than the entry time`. All form actions completed, and failure occurred at the result assertion:

```text
AssertionError: Timed out retrying after 4000ms: expected '<td>' not to contain '$'
```

The new screenshot is `results/screenshots/parking.spec.ts/Parking cost calculator -- [BUG-01] rejects a leaving time earlier than the entry time (failed) (1).png`. It shows `$0.00` and `-1 Days, 23 Hours, 0 Minutes`. All three manual screenshots remain preserved.
