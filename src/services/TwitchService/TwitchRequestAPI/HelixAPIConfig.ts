import axios from 'axios';

const twitchAPI = axios.create({
  baseURL: 'https://api.twitch.tv/helix/',
});

export default twitchAPI;
