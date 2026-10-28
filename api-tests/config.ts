// Single place for API settings. Override the base URL with API_BASE_URL.
export const API_BASE_URL = process.env.API_BASE_URL ?? 'https://jsonplaceholder.typicode.com';

export const ENDPOINTS = {
  users: '/users',
  posts: '/posts',
};
