import TwitchOAuth from './OAuthConfig';
import type { AxiosResponse } from './OAuthConfig';

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

type TwitchAuth = typeof TwitchOAuth.post<
  AccessTokenSuccessResponse,
  AxiosResponse<AccessTokenSuccessResponse, AccessTokenRequest>,
  AccessTokenRequest
>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type TwitchAuthPara = Parameters<TwitchAuth>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type TwitchAuthReturn = ReturnType<TwitchAuth>;

export const OAuthService = {
  getAccessToken: async () => {
    return await TwitchOAuth.post<
      AccessTokenSuccessResponse,
      AxiosResponse<AccessTokenSuccessResponse, AccessTokenRequest>,
      AccessTokenRequest
    >(
      '/token',
      {
        grant_type: 'client_credentials',
        client_id: process.env.TWITCH_CLIENT_ID!,
        client_secret: process.env.TWITCH_CLIENT_SECRET!,
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
