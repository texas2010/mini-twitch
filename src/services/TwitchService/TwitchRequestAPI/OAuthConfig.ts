import axios, { AxiosResponse } from 'axios';

const TwitchOAuth = axios.create({
  baseURL: 'https://id.twitch.tv/oauth2/',
});

TwitchOAuth.interceptors.request.use((config) => {
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

export default TwitchOAuth;

export type { AxiosResponse };
