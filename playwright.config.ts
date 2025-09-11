import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests/e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:3030',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for mobile devices only */
  projects: [
    // Chromium engine (Chrome, Edge, Opera, Brave, etc.)
    {
      name: 'Mobile Chromium',
      use: { ...devices['Pixel 7'] },
    },
    // WebKit engine (Safari, all iOS browsers)
    {
      name: 'Mobile Webkit',
      use: { ...devices['iPhone 12'] },
    },
    // Gecko engine (Firefox, Tor, etc.)
    {
      name: 'Mobile Firefox',
      use: {
        browserName: 'firefox',
        viewport: { width: 393, height: 851 },
        userAgent: 'Mozilla/5.0 (Mobile; rv:68.0) Gecko/68.0 Firefox/68.0',
      },
    },
    // Edge (Chromium-based) with Edge-specific user agent
    {
      name: 'Mobile Edge',
      use: {
        ...devices['Pixel 7'],
        channel: 'msedge',
      },
    },

    /* Test against desktop branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  webServer: {
    command: 'yarn run dev',
    url: 'http://localhost:3030',
    reuseExistingServer: !process.env.CI,
  },
});
