import { beforeAll, afterAll, describe, expect, test, vi } from 'vitest';

import Twitch from './service';

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

        test('should have zero protected methods', () => {
          const input = 'protected';

          const finalNum = 0;
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
    });
  });
});
