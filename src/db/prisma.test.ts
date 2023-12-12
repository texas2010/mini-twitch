import { describe, expect, test, vi } from 'vitest';

import { TwitchAppAccessTokenId } from '@/services/TwitchService/constants';
import { prismaMocked } from './__mocks__/';
import { prisma } from '.';

vi.mock('../db/prisma');

describe('prisma', () => {
  describe('twitchAccessToken', () => {
    test('should have token and timestamp', async () => {
      const newToken = {
        token: 'test test',
        timestamp: Date.now(),
      };

      prismaMocked.twitchAccessToken.create.mockResolvedValue({
        ...newToken,
        id: TwitchAppAccessTokenId,
      });

      const result = await prisma.twitchAccessToken.create({
        data: newToken,
      });
      expect(result).toStrictEqual({ ...newToken, id: TwitchAppAccessTokenId });
    });
  });
});
