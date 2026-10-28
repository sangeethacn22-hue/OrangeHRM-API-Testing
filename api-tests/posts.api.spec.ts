import { test, expect } from '@playwright/test';
import { ENDPOINTS } from './config';
import { POST_SCHEMA, expectMatchesSchema } from './schemas';

test.describe('Posts API', () => {
  test('GET /posts?userId=1 returns only that user\'s posts', async ({ request }) => {
    const response = await request.get(ENDPOINTS.posts, { params: { userId: 1 } });

    expect(response.status()).toBe(200);
    const posts = await response.json();
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
    for (const post of posts) {
      expect(post.userId).toBe(1);
      expectMatchesSchema(post, POST_SCHEMA);
    }
  });

  test('POST /posts creates a resource and echoes the payload', async ({ request }) => {
    const payload = { title: 'Expense report', body: 'Q3 travel claims', userId: 1 };

    const response = await request.post(ENDPOINTS.posts, { data: payload });

    expect(response.status()).toBe(201);
    const created = await response.json();
    expect(created).toMatchObject(payload);
    expect(typeof created.id).toBe('number');
  });

  test('GET /posts/{non-existent id} returns 404', async ({ request }) => {
    const response = await request.get(`${ENDPOINTS.posts}/999999`);

    expect(response.status()).toBe(404);
    expect(await response.json()).toEqual({});
  });
});
