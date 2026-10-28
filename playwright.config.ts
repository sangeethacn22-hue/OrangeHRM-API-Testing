import { defineConfig } from '@playwright/test';
import { API_BASE_URL } from './api-tests/config';

export default defineConfig({
  testDir: './api-tests',
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: API_BASE_URL },
});
