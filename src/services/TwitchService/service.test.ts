import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';

import Twitch from './service';

const fakeTwitchClientId = '3b6a418d243a4b4383cc6c0b8ea070c7';
const fakeTwitchClientSecret = 'd4a1e03abcf945698a6a4e4f76e8cc1a';

describe('Twitch Class', () => {
  describe('without Twitch Data in Env File', () => {
    beforeEach(() => {
      vi.stubEnv('DATABASE_URL', 'fake_database_long_url');
    });

    afterEach(() => {
      vi.unstubAllEnvs();
    });

    test('should throw an error when Twitch Api Env variable does not exist before Twitch Class Created', () => {
      try {
        new Twitch();
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).toMatch(
            /Missing required environment variable/
          );
        }
      }
    });

    test('should throw an error when Twitch Api Env Variable string is empty before Twitch Class Created', () => {
      vi.stubEnv('TWITCH_CLIENT_ID', '');
      vi.stubEnv('TWITCH_CLIENT_SECRET', '');

      try {
        new Twitch();
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).toMatch(
            /Missing required environment variable/
          );
        }
      }
    });
  });

  describe('with Twitch Data in Env File', () => {
    beforeEach(() => {
      vi.stubEnv('DATABASE_URL', 'fake_database_long_url');
      vi.stubEnv('TWITCH_CLIENT_ID', fakeTwitchClientId);
      vi.stubEnv('TWITCH_CLIENT_SECRET', fakeTwitchClientSecret);
    });
    afterEach(() => {
      vi.unstubAllEnvs();
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

    describe('THIS IS ONLY TESTING', () => {
      describe('getMembers', () => {
        test('should have zero private properties', () => {
          const input = 'private';

          const finalNum = 0;
          const twitchClient = new Twitch();

          expect(twitchClient.getMembers(input)).toHaveLength(finalNum);
        });

        test('should have protected properties array', () => {
          const input = 'protected';
          const twitchClient = new Twitch();

          twitchClient.getMembers(input).forEach((str) => {
            expect(str).toContain(input);
          });
        });

        test('should have three protected properties', () => {
          const input = 'protected';

          const finalNum = 3;
          const twitchClient = new Twitch();

          expect(twitchClient.getMembers(input)).toHaveLength(finalNum);
        });

        test('should have zero public properties', () => {
          const input = 'public';

          const finalNum = 0;
          const twitchClient = new Twitch();

          expect(twitchClient.getMembers(input)).toHaveLength(finalNum);
        });
      });

      describe('getMethods', () => {
        test('should have private methods array', () => {
          const input = 'private';
          const twitchClient = new Twitch();

          twitchClient.getMethods(input).forEach((str) => {
            expect(str).toContain(input);
          });
        });

        test('should have two private methods', () => {
          const input = 'private';

          const finalNum = 2;
          const twitchClient = new Twitch();

          expect(twitchClient.getMethods(input)).toHaveLength(finalNum);
        });

        test('should have protected methods array', () => {
          const input = 'protected';
          const twitchClient = new Twitch();

          twitchClient.getMethods(input).forEach((str) => {
            expect(str).toContain(input);
          });
        });

        test('should have one protected methods', () => {
          const input = 'protected';

          const finalNum = 1;
          const twitchClient = new Twitch();

          expect(twitchClient.getMethods(input)).toHaveLength(finalNum);
        });

        test('should have public methods array', () => {
          const input = 'public';
          const twitchClient = new Twitch();

          twitchClient.getMethods(input).forEach((str) => {
            expect(str).toContain('testtest');
          });
        });

        test('should have zero public methods', () => {
          const input = 'public';

          const finalNum = 0;
          const twitchClient = new Twitch();

          expect(twitchClient.getMethods(input)).toHaveLength(finalNum);
        });
      });
    });

    describe('_private_callBound method', () => {
      test('should have method', () => {
        const twitchClient = new Twitch();

        expect(twitchClient['_private_callBound']).toBeDefined();
      });

      test('should handle zero input and return the expected result', () => {
        const input = 'zero input';
        const fn = function () {
          return input;
        };
        const twitchClient = new Twitch();

        const result = twitchClient['_private_callBound'](fn);

        expect(result).toBe(input);
      });

      test('should handle valid input and return the expected result', () => {
        const input = 'test test';
        const fn = function (param: string) {
          return param;
        };
        const twitchClient = new Twitch();

        const result = twitchClient['_private_callBound'](fn, input);

        expect(result).toBe(input);
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

      test('should handle zero input and return the expected result', async () => {
        const input = 'zero input';
        const fn = async function () {
          return input;
        };

        const twitchClient = new Twitch();

        const result = twitchClient['_private_callBoundAsync'](fn);

        await expect(result).resolves.toBe(input);
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

      test('should handle rejection and return the expected error', async () => {
        const fn = async function (param: string) {
          throw new Error(param);
        };
        const twitchClient = new Twitch();
        const input = 'Test error';

        const result = twitchClient['_private_callBoundAsync'](fn, input);

        await expect(result).rejects.toThrowError(input);
      });

      test('should handle rejection with zero input and return the expected error', async () => {
        const input = 'Test error';
        const fn = async function () {
          throw new Error(input);
        };
        const twitchClient = new Twitch();

        const result = twitchClient['_private_callBoundAsync'](fn);

        await expect(result).rejects.toThrowError(input);
      });
    });
  });
});
