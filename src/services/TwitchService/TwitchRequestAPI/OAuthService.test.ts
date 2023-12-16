import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { OAuthService } from './OAuthService';

const axiosMock = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
}));

vi.mock('axios', async (importActual) => {
  const actual = await importActual<typeof import('axios')>();

  const mockAxios = {
    default: {
      ...actual.default,
      create: vi.fn(() => ({
        ...actual.default.create(),
        get: axiosMock.get,
        post: axiosMock.post,
      })),
    },
  };

  return mockAxios;
});

describe('TwitchOAuth', () => {
  beforeEach(() => {
    vi.stubEnv('DATABASE_URL', 'fake_database_long_url');
    vi.stubEnv('TWITCH_CLIENT_ID', 'justrandomwordsandletter');
    vi.stubEnv('TWITCH_CLIENT_SECRET', 'randomrandomwords');

    axiosMock.get.mockReset();
    axiosMock.post.mockReset();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  describe('getAccessToken', () => {
    test('should have method defined', () => {
      expect(OAuthService.getAccessToken).toBeDefined();
    });

    test('should resolved when it getting valid access token', async () => {
      const data = {
        access_token: 'asdf_asdf',
        expires_in: 600,
        token_type: 'asdf',
      };

      const { access_token } = data;

      axiosMock.post.mockResolvedValue({ data });

      await expect(OAuthService.getAccessToken()).resolves.toBe(access_token);
    });

    test('should rejected when it make bad request', async () => {
      const res = {
        status: 400,
      };

      axiosMock.post.mockRejectedValue(res);

      await expect(OAuthService.getAccessToken()).rejects.toStrictEqual(res);
    });

    test('should rejected when it do not have access token', async () => {
      const res = {
        status: 200,
      };

      axiosMock.post.mockResolvedValue(res);

      await expect(OAuthService.getAccessToken()).rejects.toThrowError(
        'App Access Token is not exist'
      );
    });
  });
});
