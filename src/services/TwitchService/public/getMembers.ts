import { MemberVisibility } from '@/types';
import { Twitch } from '../service';

export const getMembers = function (
  this: Twitch,
  keyword: MemberVisibility
): string[] {
  const keys: string[] = [];

  for (const key in this) {
    if (typeof this[key] !== 'function') {
      if (key.includes(keyword)) {
        keys.push(key);
      } else if (
        keyword === 'public' &&
        !key.includes('private') &&
        !key.includes('protected')
      ) {
        keys.push(key);
      }
    }
  }

  return keys;
};
