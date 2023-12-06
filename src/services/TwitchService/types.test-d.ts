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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type MyProps = {
      [K in keyof Twitch]: Twitch[K];
    };

    expectTypeOf<TwitchClient['_protected_clientId']>().toBeString();
    expectTypeOf<TwitchClient['_protected_clientSecret']>().toBeString();
    expectTypeOf<TwitchClient['_protected_accessToken']>().toBeString();
  });
});
