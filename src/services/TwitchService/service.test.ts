import { beforeAll, afterAll, describe, expect, test, vi } from 'vitest';

import { Twitch } from './service';

const fakeTwitchClientId = '3b6a418d243a4b4383cc6c0b8ea070c7';
const fakeTwitchClientSecret = 'd4a1e03abcf945698a6a4e4f76e8cc1a';

describe('Twitch Class', () => {
  describe('without Twitch Data in Env File', () => {
    test('should have not Twitch Api Information in the Process Env before Twitch Class created', () => {
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
  });

  describe('with Twitch Data in Env File', () => {
    beforeAll(() => {
      vi.stubEnv('TWITCH_CLIENT_ID', fakeTwitchClientId);
      vi.stubEnv('TWITCH_CLIENT_SECRET', fakeTwitchClientSecret);
    });
    afterAll(() => {
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
      const twitchClient = new Twitch();
      expect(Twitch).toBeDefined();
      expect(twitchClient).toBeDefined();
      expect(twitchClient).toBeInstanceOf(Twitch);
    });

    test('should initialize default properties when a Twitch Class instance is created', () => {
      const twitchClient = new Twitch();

      expect(twitchClient['_protected_clientId']).toBe(fakeTwitchClientId);
      expect(twitchClient['_protected_clientSecret']).toBe(
        fakeTwitchClientSecret
      );
    });

    describe('_private_callBound method', () => {
      test('should have method', () => {
        const twitchClient = new Twitch();

        expect(twitchClient['_private_callBound']).toBeDefined();
      });

      test('should handle valid input and return the expected result', () => {
        const input = 'test test';
        const fn = function (param: string) {
          return param;
        };
        const twitchClient = new Twitch();

        expect(twitchClient['_private_callBound'](fn, input)).toBe(input);
      });

      test('should handle three valid inputs and return the expected result', () => {
        const fn = function (first: string, second: number, third: string[]) {
          return `${first} ${second} - ${third.join(' ')}`;
        };
        const twitchClient = new Twitch();

        expect(
          twitchClient['_private_callBound'](fn, 'first', 2, ['third', 'third'])
        ).toBe('first 2 - third third');
      });
    });

    describe('_private_callBoundAsync method', () => {
      test('should have method', () => {
        const twitchClient = new Twitch();

        expect(twitchClient['_private_callBoundAsync']).toBeDefined();
      });

      test('should handle valid input and return the expected result', async () => {
        const fn = async function (param: string) {
          return param;
        };
        const twitchClient = new Twitch();
        const input = 'test test';

        const result = twitchClient['_private_callBoundAsync'](fn, input);

        await expect(result).resolves.toEqual(input);
      });
    });

    describe('THIS IS ONLY TESTING for getMembers and getMethods ', () => {
      test('should have zero private properties from getMembers', () => {
        const input = 'private';

        const finalNum = 0;
        const twitchClient = new Twitch();

        expect(twitchClient.getMembers(input)).toHaveLength(finalNum);
      });

      test('should have protected properties array from getMembers', () => {
        const input = 'protected';
        const twitchClient = new Twitch();

        twitchClient.getMembers(input).forEach((str) => {
          expect(str).toContain(input);
        });
      });

      test('should have three protected properties from getMembers', () => {
        const input = 'protected';

        const finalNum = 3;
        const twitchClient = new Twitch();

        expect(twitchClient.getMembers(input)).toHaveLength(finalNum);
      });

      test('should have zero public properties from getMembers', () => {
        const input = 'public';

        const finalNum = 0;
        const twitchClient = new Twitch();

        expect(twitchClient.getMembers(input)).toHaveLength(finalNum);
      });

      test('should have private methods array from getMethods', () => {
        const input = 'private';
        const twitchClient = new Twitch();

        twitchClient.getMethods(input).forEach((str) => {
          expect(str).toContain(input);
        });
      });

      test('should have two private methods from getMethods', () => {
        const input = 'private';

        const finalNum = 2;
        const twitchClient = new Twitch();

        expect(twitchClient.getMethods(input)).toHaveLength(finalNum);
      });

      test('should have protected methods array from getMethods', () => {
        const input = 'protected';
        const twitchClient = new Twitch();

        twitchClient.getMethods(input).forEach((str) => {
          expect(str).toContain(input);
        });
      });

      test('should have zero protected methods from getMethods', () => {
        const input = 'protected';

        const finalNum = 0;
        const twitchClient = new Twitch();

        expect(twitchClient.getMethods(input)).toHaveLength(finalNum);
      });

      test('should have public methods array from getMethods', () => {
        const input = 'public';
        const twitchClient = new Twitch();

        twitchClient.getMethods(input).forEach((str) => {
          expect(str).toContain('testtest');
        });
      });

      test('should have zero public methods from getMethods', () => {
        const input = 'public';

        const finalNum = 0;
        const twitchClient = new Twitch();

        expect(twitchClient.getMethods(input)).toHaveLength(finalNum);
      });
    });
  });
});
