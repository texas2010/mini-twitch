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

  describe('THIS IS ONLY TESTING for getMembers and getMethods', () => {
    test('should have correct types for getMembers method', () => {
      const twitchClient = new Twitch();

      type TwitchClientMethod = (typeof twitchClient)['getMethods'];

      expectTypeOf<TwitchClientMethod>().toBeFunction();
      expectTypeOf<TwitchClientMethod>().parameters.toEqualTypeOf<
        [MemberVisibility]
      >();
      expectTypeOf<TwitchClientMethod>().returns.toEqualTypeOf<string[]>();
    });

    test('should have correct types for getMethods method', () => {
      const twitchClient = new Twitch();
      type TwitchClientMethod = (typeof twitchClient)['getMethods'];

      expectTypeOf<TwitchClientMethod>().toBeFunction();
      expectTypeOf<TwitchClientMethod>().parameters.toEqualTypeOf<
        [MemberVisibility]
      >();
      expectTypeOf<TwitchClientMethod>().returns.toEqualTypeOf<string[]>();
    });
  });

  describe('_private_callBound method', () => {
    test('should have correct types in parameters and returns', () => {
      const twitchClient = new Twitch();

      type TwitchClientMethod = (typeof twitchClient)['_private_callBound'];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type ParaAnswer = [fn: (...args: unknown[]) => any, ...args: unknown[]];

      expectTypeOf<TwitchClientMethod>().toBeFunction();
      expectTypeOf<TwitchClientMethod>().parameters.toEqualTypeOf<ParaAnswer>();
      expectTypeOf<TwitchClientMethod>().returns.toBeAny();
    });

    test('should handle valid input and return the expected result', () => {
      const input = 'test test';
      const fn = function (param: string) {
        return param;
      };
      const twitchClient = new Twitch();

      const result = twitchClient['_private_callBound'](fn, input);

      expectTypeOf(twitchClient['_private_callBound']).toBeFunction();
      expectTypeOf(result).toEqualTypeOf(input);
      expectTypeOf(result).toEqualTypeOf<string>();
      expectTypeOf(result).not.toBeAny();
    });

    test('should handle three valid inputs and return the expected result', () => {
      const fn = function (first: string, second: number, third: string[]) {
        return `${first} ${second} - ${third.join(' ')}`;
      };
      const twitchClient = new Twitch();

      const result = twitchClient['_private_callBound'](fn, 'first', 2, [
        'third',
        'third',
      ]);

      expectTypeOf(twitchClient['_private_callBound']).toBeFunction();
      expectTypeOf(result).toEqualTypeOf('first 2 - third third');
      expectTypeOf(result).toEqualTypeOf<string>();
    });
  });

  describe('_private_callBoundAsync method', () => {
    test('should have corrent type', () => {
      const twitchClient = new Twitch();

      type TwitchClientMethod =
        (typeof twitchClient)['_private_callBoundAsync'];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type ParaAnswer = [fn: (...args: unknown[]) => any, ...args: unknown[]];

      expectTypeOf<TwitchClientMethod>().toBeFunction();
      expectTypeOf<TwitchClientMethod>().parameters.toEqualTypeOf<ParaAnswer>();
      expectTypeOf<TwitchClientMethod>().returns.resolves.toBeAny();
    });

    test('should handle valid string input and return the expected result', async () => {
      const fn = async function (param: string) {
        return param;
      };
      const twitchClient = new Twitch();
      const input = 'test test';

      const result = twitchClient['_private_callBoundAsync'](fn, input);

      expectTypeOf(twitchClient['_private_callBoundAsync']).toBeFunction();
      expectTypeOf(result).resolves.toEqualTypeOf(input);
      expectTypeOf(result).resolves.toEqualTypeOf<string>();
      expectTypeOf(result).not.resolves.toBeAny();
    });

    test('should handle valid number input and return the expected result', async () => {
      const fn = async function (param: number) {
        return param;
      };
      const twitchClient = new Twitch();
      const input = 4;

      const result = twitchClient['_private_callBoundAsync'](fn, input);

      expectTypeOf(twitchClient['_private_callBoundAsync']).toBeFunction();
      expectTypeOf(result).resolves.toEqualTypeOf(input);
      expectTypeOf(result).resolves.toEqualTypeOf<number>();
      expectTypeOf(result).not.resolves.toBeAny();
    });

    test('should handle valid object inputs and return the expected result', async () => {
      const fn = async function (para: string) {
        return {
          data: para,
        };
      };

      const input = 'long long time. just nothing.';

      const twitchClient = new Twitch();

      const result = twitchClient['_private_callBoundAsync'](fn, input);

      expectTypeOf(twitchClient['_private_callBoundAsync']).toBeFunction();
      expectTypeOf(result).resolves.toBeObject();
      expectTypeOf(result).resolves.toEqualTypeOf({
        data: input,
      });
    });

    test('should handle three valid input and return the expected result', async () => {
      const fn = async function (
        first: string,
        second: number,
        third: string[]
      ) {
        return `${first} ${second} - ${third.join(' ')}`;
      };
      const twitchClient = new Twitch();

      const result = twitchClient['_private_callBoundAsync'](fn, 'first', 2, [
        'third',
        'third',
      ]);

      expectTypeOf(twitchClient['_private_callBoundAsync']).toBeFunction();
      expectTypeOf(result).resolves.toEqualTypeOf('first 2 - third third');
      expectTypeOf(result).resolves.toEqualTypeOf<string>();
      expectTypeOf(result).not.resolves.toBeAny();
    });

    test('should handle rejection and return the expected error', async () => {
      const fn = async function (param: string) {
        throw new Error(param);
      };
      const twitchClient = new Twitch();
      const input = 'Test error';

      const result = twitchClient['_private_callBoundAsync'](fn, input);

      expectTypeOf(twitchClient['_private_callBoundAsync']).toBeFunction();
      expectTypeOf(result).toEqualTypeOf<Promise<never>>();
    });
  });
});
