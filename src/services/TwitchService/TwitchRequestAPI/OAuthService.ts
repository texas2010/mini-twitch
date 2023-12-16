import { generateConfig } from '@/utils/generateConfigHelper';
import axios, { AxiosResponse } from 'axios';

export interface AccessTokenSuccessResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export interface AccessTokenRequest {
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
    return await TwitchOAuth.post<
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
  },
  validateToken: async () => {
    const res = await TwitchOAuth.get('/validate');
    return res;
  },
};
