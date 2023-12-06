import { describe, test, expectTypeOf } from 'vitest';
import { Twitch } from './service';
import { MemberVisibility } from '@/types';

describe('Twitch Class Types', () => {
  test('should be an instance of Twitch Class', () => {
    const twitchClient = new Twitch();

    expectTypeOf(twitchClient).toEqualTypeOf<Twitch>();
  });

  test('should have correct types for protected properties', () => {
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

  test('should have correct types for getMembers', () => {
    const twitchClient = new Twitch();
    type TwitchClient = typeof twitchClient;
    type Answer = string[];

    expectTypeOf<TwitchClient['getMembers']>().toBeFunction();
    expectTypeOf<TwitchClient['getMembers']>().parameters.toEqualTypeOf<
      [MemberVisibility]
    >();
    expectTypeOf<TwitchClient['getMembers']>().returns.toEqualTypeOf<Answer>();
  });

  test('should have correct types for getMethods', () => {
    const twitchClient = new Twitch();
    type TwitchClient = typeof twitchClient;
    type Answer = string[];

    expectTypeOf<TwitchClient['getMethods']>().toBeFunction();
    expectTypeOf<TwitchClient['getMethods']>().parameters.toEqualTypeOf<
      [MemberVisibility]
    >();
    expectTypeOf<TwitchClient['getMethods']>().returns.toEqualTypeOf<Answer>();
  });
});
