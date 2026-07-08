import { defineConfig } from '@playwright/test';

export default defineConfig({
testDir: 'tests/e2e',
use: {
baseURL: 'http://127.0.0.1:4173',
trace: 'on-first-retry',
screenshot: 'only-on-failure',
video: 'retain-on-failure'
},
webServer: {
command: 'npm run build && npm run preview:test',
url: 'http://127.0.0.1:4173',
reuseExistingServer: !process.env.CI
},
workers: process.env.CI ? 1 : undefined,
retries: process.env.CI ? 2 : 0,
reporter: [
['list'],
['html']
],
projects: [
{
name: 'chromium',
use: { browserName: 'chromium' }
}
]
});
