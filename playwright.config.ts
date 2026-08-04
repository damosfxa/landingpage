import { defineConfig, devices } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npm run dev",
    url: BASE_URL,
    // Pakai server yang sudah jalan kalau ada, supaya `npm test` tidak bentrok
    // dengan dev server yang sedang dipakai.
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
