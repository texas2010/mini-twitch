import { afterEach, describe, expect, test, vi } from 'vitest';

import { Twitch } from './service';

const fakeTwitchClientId = '3b6a418d243a4b4383cc6c0b8ea070c7';
const fakeTwitchClientSecret = 'd4a1e03abcf945698a6a4e4f76e8cc1a';

describe('Twitch Class', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  test('should have Twitch Api Information in the Process Env before Twitch Class created', () => {
    try {
      new Twitch();
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe(
          'Required environment variables are not set. Set TWITCH_CLIENT_ID and TWITCH_CLIENT_SECRET.'
        );
      }
    }
  });

  test('should have Twitch Class exist', () => {
    vi.stubEnv('TWITCH_CLIENT_ID', fakeTwitchClientId);
    vi.stubEnv('TWITCH_CLIENT_SECRET', fakeTwitchClientSecret);

    const twitchClient = new Twitch();
    expect(Twitch).toBeDefined();
    expect(twitchClient).toBeDefined();
    expect(twitchClient).toBeInstanceOf(Twitch);
  });

  test('Should initialize default properties when a Twitch Class instance is created', () => {
    vi.stubEnv('TWITCH_CLIENT_ID', fakeTwitchClientId);
    vi.stubEnv('TWITCH_CLIENT_SECRET', fakeTwitchClientSecret);

    const twitchClient = new Twitch();

    expect(twitchClient['_clientId']).toBe(fakeTwitchClientId);
    expect(twitchClient['_clientSecret']).toBe(fakeTwitchClientSecret);
  });
});
