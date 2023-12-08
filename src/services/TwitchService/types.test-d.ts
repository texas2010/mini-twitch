import { describe, test, expectTypeOf } from 'vitest';
import { Twitch } from './service';
import { MemberVisibility } from '@/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type MyProps = {
  [K in keyof Twitch]: Twitch[K];
};

describe('Twitch Class Types', () => {
  test('should be an instance of Twitch Class', () => {
    const twitchClient = new Twitch();

    expectTypeOf(twitchClient).toEqualTypeOf<Twitch>();
  });

  test('should have correct types for protected properties', () => {
    const twitchClient = new Twitch();
    type TwitchClient = typeof twitchClient;

    expectTypeOf<TwitchClient['_protected_clientId']>().toBeString();
    expectTypeOf<TwitchClient['_protected_clientSecret']>().toBeString();
    expectTypeOf<TwitchClient['_protected_accessToken']>().toBeString();
  });

  test('should have correct types for getMembers method', () => {
    const twitchClient = new Twitch();

    type TwitchClientMethod = (typeof twitchClient)['getMethods'];
    type ParaAnswer = [MemberVisibility];
    type ReturnAnswer = string[];

    expectTypeOf<TwitchClientMethod>().toBeFunction();
    expectTypeOf<TwitchClientMethod>().parameters.toEqualTypeOf<ParaAnswer>();
    expectTypeOf<TwitchClientMethod>().returns.toEqualTypeOf<ReturnAnswer>();
  });

  test('should have correct types for getMethods method', () => {
    const twitchClient = new Twitch();
    type TwitchClientMethod = (typeof twitchClient)['getMethods'];
    type ParaAnswer = [MemberVisibility];
    type ReturnAnswer = string[];

    expectTypeOf<TwitchClientMethod>().toBeFunction();
    expectTypeOf<TwitchClientMethod>().parameters.toEqualTypeOf<ParaAnswer>();
    expectTypeOf<TwitchClientMethod>().returns.toEqualTypeOf<ReturnAnswer>();
  });

  test('should have correct types for _private_callBound method', () => {
    const twitchClient = new Twitch();

    type TwitchClientMethod = (typeof twitchClient)['_private_callBound'];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type ParaAnswer = [fn: (...args: unknown[]) => any, ...args: unknown[]];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type ReturnAnswer = any;

    expectTypeOf<TwitchClientMethod>().toBeFunction();
    expectTypeOf<TwitchClientMethod>().parameters.toEqualTypeOf<ParaAnswer>();
    expectTypeOf<TwitchClientMethod>().returns.toEqualTypeOf<ReturnAnswer>();
  });

  test('should have corrent type for _private_callBoundAsync method', () => {
    const twitchClient = new Twitch();

    type TwitchClient = typeof twitchClient;

    type TwitchClientMethod = TwitchClient['_private_callBoundAsync'];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type ParaAnswer = [fn: (...args: unknown[]) => any, ...args: unknown[]];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type ReturnAnswer = any;

    expectTypeOf<TwitchClientMethod>().toBeFunction();
    expectTypeOf<TwitchClientMethod>().parameters.toEqualTypeOf<ParaAnswer>();
    expectTypeOf<TwitchClientMethod>().returns.resolves.toEqualTypeOf<ReturnAnswer>();
  });
});
