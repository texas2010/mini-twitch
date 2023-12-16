import { generateConfig } from '@/utils/generateConfigHelper';
import axios, { AxiosResponse } from 'axios';

interface AccessTokenSuccessResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

interface AccessTokenRequest {
  client_id: string;
  client_secret: string;
  grant_type: 'client_credentials';
}

const TwitchOAuth = axios.create({
  baseURL: 'https://id.twitch.tv/oauth2/',
});

TwitchOAuth.interceptors.request.use((config) => {
  console.log(config);
  return config;
});

export const OAuthService = {
  getAccessToken: async () => {
    const { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } = generateConfig();

    try {
      const res = await TwitchOAuth.post<
        AccessTokenSuccessResponse,
        AxiosResponse<AccessTokenSuccessResponse, AccessTokenRequest>,
        AccessTokenRequest
      >(
        '/token',
        {
          grant_type: 'client_credentials',
          client_id: TWITCH_CLIENT_ID,
          client_secret: TWITCH_CLIENT_SECRET,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      if (!res.data?.access_token) {
        throw new Error('App Access Token is not exist');
      }
      return res.data.access_token;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw error;
    }
  },
  validateToken: async () => {
    const res = await TwitchOAuth.get('/validate');
    return res;
  },
};
