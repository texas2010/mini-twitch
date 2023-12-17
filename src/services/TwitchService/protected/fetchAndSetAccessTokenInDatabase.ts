import { OAuthService } from '../TwitchRequestAPI';
import Twitch from '../service';

export const fetchAndSetAccessTokenInDatabase = async function (this: Twitch) {
  try {
    const accessToken = await OAuthService.getAccessToken();
    this._protected_accessToken = accessToken;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw error;
  }
};
