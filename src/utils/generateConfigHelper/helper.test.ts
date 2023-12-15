import { afterEach, describe, expect, test, vi } from 'vitest';
import { generateConfig } from './helper';

describe('generateConfig helper', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  test('should have function defined', () => {
    expect(generateConfig).toBeDefined();
  });

  test('should throw error when any env variables is missing', () => {
    expect(() => generateConfig()).toThrowError(
      /Missing required environment variable/
    );
  });

  test('should throw error when TWITCH_CLIENT_SECRET is missing', () => {
    vi.stubEnv('DATABASE_URL', 'fake_database_long_url');
    vi.stubEnv('TWITCH_CLIENT_ID', 'justrandomwordsandletter');

    expect(() => generateConfig()).toThrowError(
      /Missing required environment variable/
    );
    expect(() => generateConfig()).toThrowError(/TWITCH_CLIENT_SECRET/);
  });

  test('should throw error when TWITCH_CLIENT_ID is missing', () => {
    vi.stubEnv('DATABASE_URL', 'fake_database_long_url');
    vi.stubEnv('TWITCH_CLIENT_SECRET', 'justrandomwordsandletter');

    expect(() => generateConfig()).toThrowError(
      /Missing required environment variable/
    );
    expect(() => generateConfig()).toThrowError(/TWITCH_CLIENT_ID/);
  });

  test('should have all env variables is exist', () => {
    vi.stubEnv('DATABASE_URL', 'fake_database_long_url');
    vi.stubEnv('TWITCH_CLIENT_ID', 'justrandomwordsandletter');
    vi.stubEnv('TWITCH_CLIENT_SECRET', 'randomrandomwords');

    expect(generateConfig()).toStrictEqual({
      DATABASE_URL: 'fake_database_long_url',
      TWITCH_CLIENT_ID: 'justrandomwordsandletter',
      TWITCH_CLIENT_SECRET: 'randomrandomwords',
    });
  });
});
