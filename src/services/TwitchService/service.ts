export class Twitch {
  protected readonly _clientId: string;
  protected readonly _clientSecret: string;
  protected _accessToken: string;

  constructor() {
    if (!process.env.TWITCH_CLIENT_ID || !process.env.TWITCH_CLIENT_SECRET) {
      throw new Error(
        'Required environment variables are not set. Set TWITCH_CLIENT_ID and TWITCH_CLIENT_SECRET.'
      );
    }

    this._clientId = process.env.TWITCH_CLIENT_ID;
    this._clientSecret = process.env.TWITCH_CLIENT_SECRET;
    this._accessToken = '';
  }
}
