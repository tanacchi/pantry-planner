import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:5173",
    trace: "on",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone SE"] },
    },
  ],

  webServer: [
    {
      command: "cd ../api && npm run start:dev",
      port: 8000,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: "cd ../ui && npm run dev",
      port: 5173,
      reuseExistingServer: !process.env.CI,
    },
  ],
});
