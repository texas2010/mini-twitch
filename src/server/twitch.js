if (process.env.NODE_ENV === 'development') require('dotenv').config();

const fetch = require('node-fetch');

const { CLIENT_ID, CLIENT_SECRET } = process.env;

class Twitch {
  constructor(clientId, clientSecret) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.accessToken = undefined;
  }

  async getAccessToken() {
    const url = `https://id.twitch.tv/oauth2/token?client_id=${this.clientId}&client_secret=${this.clientSecret}&grant_type=client_credentials`;
    const res = await fetch(url, { method: 'POST' });
    const data = await res.json();
    if (data.status === 401) {
      const { status, message } = data;
      return { status, message };
    }
    if (data.access_token) {
      this.accessToken = data.access_token;
    }
  }

  async getUserId(username) {
    if (!this.accessToken) {
      await this.getAccessToken();
    }
    const url = `https://api.twitch.tv/helix/users?login=${username}`;
    const res = await fetch(url, {
      headers: { 'client-id': this.clientId, Authorization: `Bearer ${this.accessToken}` },
    });
    const data = await res.json();
    if (data.error) {
      return { error: 'Something wrong and try again.' };
    }
    if (data.data && !data.data[0]) {
      return { message: 'Username is not exist.', isUsernameExist: false };
    }
    if (data.data && data.data[0] && data.data[0].id) {
      return { id: data.data[0].id, isUsernameExist: true };
    }
  }

  async isUsernameExist(username) {
    return this.getUserId(username);
  }

  async getUserFollowList(id) {}
}

const TwitchAPI = new Twitch(CLIENT_ID, CLIENT_SECRET);

module.exports = TwitchAPI;
