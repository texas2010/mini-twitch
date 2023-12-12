import { MemberVisibility } from '@/types';
import Twitch from '../service';

const ignoredItems = [
  'constructor',
  'toString',
  'valueOf',
  '__defineGetter__',
  '__defineSetter__',
  'hasOwnProperty',
  '__lookupGetter__',
  '__lookupSetter__',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'getMembers',
  'getMethods',
];

export const getMethods = function (
  this: Twitch,
  keyword: MemberVisibility
): string[] {
  const methods: string[] = [];
  let currentPrototype = this as Twitch;

  while (currentPrototype !== null) {
    for (const key of Object.getOwnPropertyNames(currentPrototype)) {
      if (typeof currentPrototype[key] === 'function') {
        if (ignoredItems.includes(key)) {
          continue;
        }
        if (key.includes(keyword)) {
          methods.push(key);
        } else if (
          keyword === 'public' &&
          !key.includes('private') &&
          !key.includes('protected')
        ) {
          methods.push(key);
        }
      }
    }

    currentPrototype = Object.getPrototypeOf(currentPrototype);
  }

  return methods;
};
