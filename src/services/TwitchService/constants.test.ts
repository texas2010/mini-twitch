import { describe, expect, test } from 'vitest';
import { TWITCH_APP_ACCESS_TOKEN_ID } from './constants';

describe('constants', () => {
  test('should have TWITCH_APP_ACCESS_TOKEN_ID', () => {
    expect(TWITCH_APP_ACCESS_TOKEN_ID).toBe('TWITCH_APP_ACCESS_TOKEN_ID');
  });
});
