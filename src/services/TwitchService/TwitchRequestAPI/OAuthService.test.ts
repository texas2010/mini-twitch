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

    test('should resolved when it getting valid token', async () => {
      const data = {
        access_token: 'asdf_asdf',
        expires_in: 600,
        token_type: 'asdf',
      };

      axiosMock.post.mockResolvedValue({
        data,
      });

      await expect(OAuthService.getAccessToken()).resolves.toStrictEqual({
        data,
      });
    });

    test('should rejected when request is wrong', async () => {
      const data = {
        status: 400,
      };

      axiosMock.post.mockRejectedValue({ data });

      await expect(OAuthService.getAccessToken()).rejects.toStrictEqual({
        data,
      });
    });
  });
});
