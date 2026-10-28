import { expect } from '@playwright/test';

// Lightweight field-type validation (no extra dependencies).
type FieldType = 'string' | 'number' | 'object';
export type Schema = Record<string, FieldType>;

export const POST_SCHEMA: Schema = { userId: 'number', id: 'number', title: 'string', body: 'string' };
export const USER_SCHEMA: Schema = { id: 'number', name: 'string', username: 'string', email: 'string', address: 'object', company: 'object' };

export function expectMatchesSchema(data: Record<string, unknown>, schema: Schema) {
  for (const [field, type] of Object.entries(schema)) {
    expect(data, `missing field "${field}"`).toHaveProperty(field);
    expect(typeof data[field], `field "${field}" should be ${type}`).toBe(type);
  }
}
