import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: process.env.UI_HOST ?? "http://localhost:5173",
    trace: "on",
    screenshot: "only-on-failure",
  },

  // iPhone SE 相当の viewport は responsive.spec.ts が viewport ループで
  // 別途カバーしているため、ブラウザエンジン別の project としては持たない。
  projects: [
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },
  ],

  webServer: [
    {
      command: "pnpm -C ../api run start:dev",
      port: 8000,
      timeout: 120_000,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: "pnpm -C ../ui run dev",
      port: 5173,
      timeout: 120_000,
      env: {
        API_HOST: process.env.API_HOST ?? "http://localhost:8000",
      },
      reuseExistingServer: !process.env.CI,
    },
  ],
});
