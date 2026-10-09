import { defineConfig } from "cypress";
import { config } from "dotenv";
import { resolve } from "node:path";

config({ path: resolve(__dirname, ".env") });

const baseUrl = process.env.PARKING_BASE_URL?.trim();

if (!baseUrl) {
  throw new Error(
    "PARKING_BASE_URL is required. Copy .env.example to .env and set PARKING_BASE_URL before running Cypress.",
  );
}

export default defineConfig({
  e2e: {
    baseUrl,
    specPattern: "cypress/e2e/parking-calculator.cy.ts",
    supportFile: "cypress/support/commands.ts",
  },
  video: false,
  screenshotsFolder: "cypress/results/screenshots",
  trashAssetsBeforeRuns: false,
});
