import { beforeAll, afterAll, describe, expect, test, vi } from 'vitest';

import { Twitch } from './service';

const fakeTwitchClientId = '3b6a418d243a4b4383cc6c0b8ea070c7';
const fakeTwitchClientSecret = 'd4a1e03abcf945698a6a4e4f76e8cc1a';

describe('Twitch Class', () => {
  describe('without Twitch Data in Env File', () => {
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
  });

  describe('with Twitch Data in Env File', () => {
    beforeAll(() => {
      vi.stubEnv('TWITCH_CLIENT_ID', fakeTwitchClientId);
      vi.stubEnv('TWITCH_CLIENT_SECRET', fakeTwitchClientSecret);
    });
    afterAll(() => {
      vi.unstubAllEnvs();
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

      test('should have one private methods from getMethods', () => {
        const input = 'private';

        const finalNum = 1;
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
  });
});
