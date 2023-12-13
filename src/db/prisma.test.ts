import { describe, expect, test, vi } from 'vitest';

import { TWITCH_APP_ACCESS_TOKEN_ID } from '@/services/TwitchService/constants';

import { prismaMock } from './__mocks__/';
import { prisma } from '.';

vi.mock('../db/prisma');

describe('prisma', () => {
  describe('twitchAccessToken', () => {
    test('should have token and timestamp after create data', async () => {
      const token = {
        token: 'test test',
      };

      prismaMock.twitchAccessToken.create.mockResolvedValue({
        ...token,
        id: TWITCH_APP_ACCESS_TOKEN_ID,
      });

      const result = await prisma.twitchAccessToken.create({
        data: token,
      });

      expect(result).toStrictEqual({
        ...token,
        id: TWITCH_APP_ACCESS_TOKEN_ID,
      });
    });

    test('should return valid data when it use findUnique method', async () => {
      const token = {
        token: 'asdfasdf',
      };

      prismaMock.twitchAccessToken.findUnique.mockResolvedValue({
        ...token,
        id: TWITCH_APP_ACCESS_TOKEN_ID,
      });

      const result = await prisma.twitchAccessToken.findUnique({
        where: {
          id: TWITCH_APP_ACCESS_TOKEN_ID,
        },
      });

      expect(result).toStrictEqual({
        ...token,
        id: TWITCH_APP_ACCESS_TOKEN_ID,
      });
    });

    test('should return valid data when it use update method', async () => {
      const token = {
        token: 'asdfasdf',
      };

      prismaMock.twitchAccessToken.update.mockResolvedValue({
        ...token,
        id: TWITCH_APP_ACCESS_TOKEN_ID,
      });

      const result = await prisma.twitchAccessToken.update({
        where: {
          id: TWITCH_APP_ACCESS_TOKEN_ID,
        },
        data: token,
      });

      expect(result).toStrictEqual({
        ...token,
        id: TWITCH_APP_ACCESS_TOKEN_ID,
      });
    });
  });
});
