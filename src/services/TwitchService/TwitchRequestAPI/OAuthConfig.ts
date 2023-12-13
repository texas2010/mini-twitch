import axios from 'axios';

const TwitchOAuth = axios.create({
  baseURL: 'https://id.twitch.tv/oauth2/',
});

TwitchOAuth.interceptors.request.use((config) => {
  if (config.url === '/token') {
    config.data = new URLSearchParams({
      client_id: 'hof5gwx0su6owfnys0yan9c87zr6t',
      client_secret: '41vpdji4e9gif29md0ouet6fktd2',
      grant_type: 'client_credentials',
      ...config.data,
    }).toString();

    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  }

  return config;
});

export default TwitchOAuth;
