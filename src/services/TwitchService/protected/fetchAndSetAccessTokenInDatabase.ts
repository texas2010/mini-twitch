import { OAuthService } from '../TwitchRequestAPI';
import Twitch from '../service';

export const fetchAndSetAccessTokenInDatabase = async function (this: Twitch) {
  try {
    const res = await OAuthService.getAccessToken();
    return res;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw error;
  }
};
