// playwright.config.ts

import { defineConfig, devices } from "@playwright/test";

export const STORAGE_STATE = "./auth/session.json";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    trace: "on-first-retry",
    baseURL: "http://localhost:3000",
  },

  projects: [
    {
      name: "login",
      use: { ...devices["Desktop Chrome"] },
      testMatch: "**/login.setup.ts", // Notice the updated spec name
    },
    {
      name: "Logged In tests",
      use: { ...devices["Desktop Chrome"], storageState: STORAGE_STATE },
      dependencies: ["login"],
      testMatch: "**/*.spec.ts",
      testIgnore: "**/register.spec.ts",
    },
    {
      name: "Logged out tests",
      use: { ...devices["Desktop Chrome"] },
      testMatch: "**/register.spec.ts",
    },
  ],
});