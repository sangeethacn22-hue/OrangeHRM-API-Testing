import { test, expect } from '@playwright/test';
import { ENDPOINTS } from './config';
import { USER_SCHEMA, expectMatchesSchema } from './schemas';

test.describe('Users API', () => {
  test('GET /users/1 returns 200 with correct fields and types', async ({ request }) => {
    const response = await request.get(`${ENDPOINTS.users}/1`);

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const user = await response.json();
    expect(user.id).toBe(1);
    expect(user.email).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
    expectMatchesSchema(user, USER_SCHEMA);
  });

  test('GET /users/{unknown id} returns 404 and an empty body', async ({ request }) => {
    const response = await request.get(`${ENDPOINTS.users}/9999`);

    expect(response.status()).toBe(404);
    expect(await response.json()).toEqual({});
  });
});
