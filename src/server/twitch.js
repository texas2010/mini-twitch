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
    try {
      const url = `https://id.twitch.tv/oauth2/token?client_id=${this.clientId}&client_secret=${this.clientSecret}&grant_type=client_credentials`;
      const res = await fetch(url, { method: 'POST' });
      const data = await res.json();
      // eslint-disable-next-line no-console
      console.log('setAccessToken:', data);
      if (data.refresh_token) {
        // eslint-disable-next-line no-console
        console.log('I got refresh token: ', data.refresh_token);
        return;
      }
      if (data.status) {
        throw new Error('Something wrong with it and try again.');
      }
      if (data.access_token) {
        this.accessToken = data.access_token;
      }
    } catch (error) {
      throw new Error('Something wrong with it and try again.');
    }
  }

  async checkValidAuth() {
    try {
      const url = `https://id.twitch.tv/oauth2/validate`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      });
      const data = await res.json();
      // eslint-disable-next-line no-console
      console.log('getValidAuth:', data);
      if (data.expires_in && data.expires_in > 0) {
        return true;
      }
      return false;
    } catch (error) {
      throw new Error('Something wrong with it and try again.');
    }
  }

  async getUserId(username) {
    if (!this.accessToken) {
      await this.setAccessToken();
    }
    if (!(await this.checkValidAuth())) {
      return { errorMessage: 'Something wrong with it and try again.' };
    }
    try {
      const url = `https://api.twitch.tv/helix/users?login=${username}`;
      const res = await fetch(url, {
        headers: { 'client-id': this.clientId, Authorization: `Bearer ${this.accessToken}` },
      });
      const data = await res.json();
      if (data.error) {
        return { errorMessage: 'Something wrong with it and try again.' };
      }
      if (data.data && !data.data[0]) {
        return { errorMessage: '* Username is not exist in the Twitch.' };
      }
      if (data.data && data.data[0] && data.data[0].id) {
        return { userId: data.data[0].id, isUsernameExist: true };
      }
    } catch (error) {
      throw new Error('Something wrong with it and try again.');
    }
    return undefined;
  }

  async getUserFollowing(id) {
    try {
      const url = `https://api.twitch.tv/helix/users/follows?from_id=${id}`;
      const res = await fetch(url, {
        headers: { 'client-id': this.clientId, Authorization: `Bearer ${this.accessToken}` },
      });
      return res.json();
    } catch (error) {
      throw new Error('Something wrong with it and try again.');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async getFollowingArrayFromData(realData) {
    // eslint-disable-next-line camelcase
    return realData.map(({ to_login }) => to_login);
  }

  async getUsersInformation(followingArr) {
    const query = await followingArr.map((username) => `login=${username}`).join('&');
    try {
      const url = await `https://api.twitch.tv/helix/users?${query}`;
      const res = await fetch(url, {
        headers: { 'client-id': this.clientId, Authorization: `Bearer ${this.accessToken}` },
      });
      return res.json();
    } catch (error) {
      throw new Error('Something wrong with it and try again.');
    }
  }

  async getStreamsInformation(followingArr) {
    const query = await followingArr.map((username) => `user_login=${username}`).join('&');
    try {
      const url = await `https://api.twitch.tv/helix/streams?${query}`;
      const res = await fetch(url, {
        headers: { 'client-id': this.clientId, Authorization: `Bearer ${this.accessToken}` },
      });
      return res.json();
    } catch (error) {
      throw new Error('Something wrong with it and try again.');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async UsersAndStreamIntoOneData(rawUsersArr, rawStreamsArr) {
    const merge = (arr1, arr2) => {
      const hash = new Map();
      arr1.concat(arr2).forEach((obj) => {
        hash.set(obj.username_id, Object.assign(hash.get(obj.username_id) || {}, obj));
      });
      return Array.from(hash.values());
    };
    // eslint-disable-next-line camelcase
    const usersArr = rawUsersArr.map(({ login, display_name, description, profile_image_url }) => ({
      username_id: login,
      username: login,
      userDisplayName: display_name,
      userDescription: description,
      userProfileImageUrl: profile_image_url,
    }));
    const streamsArr = rawStreamsArr.map(
      // eslint-disable-next-line camelcase
      ({ user_login, type, title, thumbnail_url, game_name, viewer_count }) => ({
        username_id: user_login,
        streamType: type,
        streamTitle: title,
        streamThumbnailUrl: thumbnail_url.replace(/{width}x{height}/, '180x100'),
        streamGameName: game_name,
        streamViewerCount: viewer_count,
      })
    );
    if (streamsArr.length === 0) {
      return usersArr;
    }
  }

  async showFollowingListFirst(username) {
    // Get User ID
    const dataObj = await this.getUserId(username);
    if (dataObj.errorMessage) {
      return dataObj;
    }
    // Get User Following
    const theirFollowingList = await this.getUserFollowing(dataObj.userId);

    if (theirFollowingList.total === 0) {
      return {
        errorMessage: `That username don't have following list`,
      };
    }

    // Convert data object to data array
    const theirFollowingArray = await this.getFollowingArrayFromData(theirFollowingList.data);

    // Get Users Information
    const getUsersInformation = await this.getUsersInformation(theirFollowingArray);

    // Get Streams Information
    const getStreamsInformation = await this.getStreamsInformation(theirFollowingArray);

    // Full Data Information
    const fullDataInformation = await this.UsersAndStreamIntoOneData(
      getUsersInformation.data,
      getStreamsInformation.data
    );

    return {
      ...dataObj,
      fullDataInformation,
    };
  }
}

const TwitchAPI = new Twitch(CLIENT_ID, CLIENT_SECRET, MY_ACCESS_TOKEN);

module.exports = TwitchAPI;
