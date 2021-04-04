if (process.env.NODE_ENV === 'development') require('dotenv').config();

const fetch = require('node-fetch');

const { CLIENT_ID, CLIENT_SECRET, MY_ACCESS_TOKEN } = process.env;

class Twitch {
  constructor(_clientId, _clientSecret, _accessToken) {
    this.clientId = _clientId;
    this.clientSecret = _clientSecret;
    this.accessToken = _accessToken;
  }

  async setAccessToken() {
    if (this.accessToken) {
      return;
    }
    const url = `https://id.twitch.tv/oauth2/token?client_id=${this.clientId}&client_secret=${this.clientSecret}&grant_type=client_credentials`;
    const res = await fetch(url, { method: 'POST' });
    const data = await res.json();
    console.log('setAccessToken: ', data);
    if (data.refresh_token) {
      console.log('I got refresh token: ', data.refresh_token);
      return;
    }
    if (data.status === 401 || data.status === 400) {
      return;
    }
    if (data.access_token) {
      this.accessToken = data.access_token;
    }
  }

  async checkValidAuth() {
    const url = `https://id.twitch.tv/oauth2/validate`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${this.accessToken}` },
    });
    const data = await res.json();
    console.log('getValidAuth: ', data);
    if (data.expires_in && data.expires_in > 0) {
      return true;
    }
    return false;
  }

  async getUserId(username) {
    if (!this.accessToken) {
      await this.setAccessToken();
    }
    if (!(await this.checkValidAuth())) {
      return { errorMessage: 'Something wrong and try again.' };
    }
    const url = `https://api.twitch.tv/helix/users?login=${username}`;
    const res = await fetch(url, {
      headers: { 'client-id': this.clientId, Authorization: `Bearer ${this.accessToken}` },
    });
    const data = await res.json();
    // console.log('getUserId', data);
    if (data.error) {
      return { errorMessage: 'Something wrong and try again.' };
    }
    if (data.data && !data.data[0]) {
      return { errorMessage: '* Username is not exist in the Twitch.' };
    }
    if (data.data && data.data[0] && data.data[0].id) {
      return { userId: data.data[0].id, isUsernameExist: true };
    }
  }

  async getUserFollowList(id) {
    const url = `https://api.twitch.tv/helix/users/follows?from_id=${id}`;
    const res = await fetch(url, {
      headers: { 'client-id': this.clientId, Authorization: `Bearer ${this.accessToken}` },
    });
    return res.json();
  }

  async getUserFollowListFirst(username) {
    const dataObj = await this.getUserId(username);
    // console.log('user', dataObj);
    if (dataObj.errorMessage) {
      return dataObj;
    }
    const theirFollowingList = await this.getUserFollowList(dataObj.userId);
    // console.log('followList', theirFollowingList);
    if (theirFollowingList.total === 0) {
      return {
        errorMessage: `That username don't have following list`,
      };
    }
    const finalTheirFollowingList = await this.getStreamsInformation(theirFollowingList.data);
    // console.log(finalTheirFollowingList);

    return {
      ...dataObj,
      successMessage: `That username have following list`,
    };
  }

  async getStreamsInformation(followingArr) {
    const queryArr = await followingArr.map(({ to_login }) => `login=${to_login}`).join('&');
    const url = await `https://api.twitch.tv/helix/users?${queryArr}`;
    const res = await fetch(url, {
      headers: { 'client-id': this.clientId, Authorization: `Bearer ${this.accessToken}` },
    });
    const usersObj = await res.json();
    const newArr = await usersObj.data.map(
      ({ login, display_name, description, profile_image_url }) => ({
        login,
        display_name,
        description,
        profile_image_url,
      })
    );
    console.log(newArr);
  }
}

const TwitchAPI = new Twitch(CLIENT_ID, CLIENT_SECRET, MY_ACCESS_TOKEN);

module.exports = TwitchAPI;