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

type TwitchAuth = typeof TwitchOAuth.post<
  AccessTokenSuccessResponse,
  AxiosResponse<AccessTokenSuccessResponse, AccessTokenRequest>,
  AccessTokenRequest
>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type TwitchAuthPara = Parameters<TwitchAuth>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type TwitchAuthReturn = ReturnType<TwitchAuth>;

const TwitchOAuth = axios.create({
  baseURL: 'https://id.twitch.tv/oauth2/',
});

TwitchOAuth.interceptors.request.use((config) => {
  console.log(config);
  return config;
});

// TwitchOAuth.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

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
        signal: AbortSignal.timeout(1000),
      }
    );
  },
  validateToken: async () => {
    const res = await TwitchOAuth.get('/validate');
    return res;
  },
};
