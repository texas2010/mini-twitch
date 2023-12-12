import type { MemberVisibility } from '@/types';
import { getMembers } from './public/getMembers';
import { getMethods } from './public/getMethods';

class Twitch {
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
    return fn.apply(this, args) as ReturnType<T>;
  }

  private async _private_callBoundAsync<
    T extends (...args: [...Parameters<T>]) => ReturnType<T>
  >(fn: T, ...args: [...Parameters<T>]): Promise<Awaited<ReturnType<T>>> {
    return fn.apply(this, args) as Promise<Awaited<ReturnType<T>>>;
  }

  // protected _protected_setAccessToken
}

/*
THIS IS ONLY TESTING for getMembers and getMethods
*/
if (process.env.NODE_ENV === 'test') {
  Twitch.prototype.getMembers = getMembers;
  Twitch.prototype.getMethods = getMethods;
}

export default Twitch;
