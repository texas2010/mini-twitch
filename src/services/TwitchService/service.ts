import type { MemberVisibility } from '@/types';

export class Twitch {
  protected readonly _protected_clientId: string;
  protected readonly _protected_clientSecret: string;
  protected _protected_accessToken: string;

  public getMembers!: (keyword: MemberVisibility) => string[];
  public getMethods!: (keyword: MemberVisibility) => string[];

  [key: string]: unknown;

  constructor() {
    if (!process.env.TWITCH_CLIENT_ID || !process.env.TWITCH_CLIENT_SECRET) {
      throw new Error(
        'Required environment variables are not set. Set TWITCH_CLIENT_ID and TWITCH_CLIENT_SECRET.'
      );
    }

    this._protected_clientId = process.env.TWITCH_CLIENT_ID;
    this._protected_clientSecret = process.env.TWITCH_CLIENT_SECRET;
    this._protected_accessToken = '';
  }

  private _private_callBound<
    T extends (...args: [...Parameters<T>]) => ReturnType<T>
  >(fn: T, ...args: [...Parameters<T>]): ReturnType<T> {
    return fn.call(this, ...args) as ReturnType<T>;
  }
}

/*
THIS IS ONLY TESTING for getMembers and getMethods
*/
if (process.env.NODE_ENV === 'test') {
  console.log('Twitch getMembers and getMethods:', process.env.NODE_ENV);
  Twitch.prototype.getMembers = function (keyword: MemberVisibility): string[] {
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
  Twitch.prototype.getMethods = function (keyword: MemberVisibility): string[] {
    const methods: string[] = [];

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let currentPrototype = this;

    while (currentPrototype !== null) {
      for (const key of Object.getOwnPropertyNames(currentPrototype)) {
        if (typeof currentPrototype[key] === 'function') {
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
}
