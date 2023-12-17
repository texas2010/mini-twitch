import type { MemberVisibility } from '@/types';
import { generateConfig } from '@/utils/generateConfigHelper';

import { fetchAndSetAccessTokenInDatabase } from './protected';
import { getMembers, getMethods } from './public';

class Twitch {
  protected readonly _protected_clientId: string;
  protected readonly _protected_clientSecret: string;
  protected _protected_accessToken: string;

  public getMembers!: (keyword: MemberVisibility) => string[];
  public getMethods!: (keyword: MemberVisibility) => string[];

  [key: string]: unknown;

  constructor() {
    const { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } = generateConfig();

    this._protected_clientId = TWITCH_CLIENT_ID;
    this._protected_clientSecret = TWITCH_CLIENT_SECRET;
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

  protected async _protected_fetchAndSetAccessTokenInDatabase() {
    return this._private_callBoundAsync(fetchAndSetAccessTokenInDatabase);
  }
}

/*
THIS IS ONLY TESTING for getMembers and getMethods
*/
if (process.env.NODE_ENV === 'test') {
  Twitch.prototype.getMembers = getMembers;
  Twitch.prototype.getMethods = getMethods;
}

export default Twitch;
