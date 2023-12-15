import { beforeEach, describe, test, vi } from 'vitest';

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
    axiosMock.get.mockReset();
    axiosMock.post.mockReset();
  });

  describe('getAccessToken', () => {
    test('call it when it gettting valid token', async () => {
      axiosMock.post.mockResolvedValue({
        data: {
          access_token: 'asdf_asdf',
          expires_in: 600,
          token_type: 'asdf',
        },
      });

      await OAuthService.getAccessToken();
    });
  });
});
