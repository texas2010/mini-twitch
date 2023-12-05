import { describe, test, expectTypeOf } from 'vitest';
import { Twitch } from './service';

describe('Twitch Class Types', () => {
  test('should be an instance of Twitch Class', () => {
    const twitchClient = new Twitch();

    expectTypeOf(twitchClient).toEqualTypeOf<Twitch>();
  });

  test('should have correct types for properties in Twitch Class', () => {
    const twitchClient = new Twitch();

    type TwitchClient = typeof twitchClient;

    expectTypeOf<TwitchClient['_clientId']>().toBeString();
    expectTypeOf<TwitchClient['_clientSecret']>().toBeString();
    expectTypeOf<TwitchClient['_accessToken']>().toBeString();
  });
});
