class Spotify {
  /**
   *
   */
  constructor() {
    this.accessToken = "";
    this.expiresIn = "";
    this.client_id = "27275439c25449e5ba738a0529c53a68";
    this.scope = "playlist-modify-public";
    this.redirect_uri = "http://localhost:3000/";
  }

  /**
   * Checks if the user’s access token is already set. If it is, return the
   * value saved to access token.
   *
   * @returns {accessToken} The API token of the client.
   */
  getAccessToken() {
    if (this.accessToken) return this.accessToken;

    let tokenURL = window.location.href.match(/access_token=([^&]*)/);
    let expireURL = window.location.href.match(/expires_in=([^&]*)/);

    if (tokenURL && expireURL) {
      this.accessToken = tokenURL[1];
      this.expiresIn = expireURL[1];

      window.setTimeout(
        () => (this.accessToken = "undefined"),
        this.expiresIn * 1000
      );
      window.history.pushState("Access Token", null, "/");
      return this.accessToken;
    }

    if (!this.accessToken && !tokenURL) {
      var url = `https://accounts.spotify.com/authorize`;
      url += `?response_type=token`;
      url += `&client_id=${encodeURIComponent(this.client_id)}`;
      url += `&scope=${encodeURIComponent(this.scope)}`;
      url += `&redirect_uri=${encodeURIComponent(this.redirect_uri)}`;
      window.location = url;
    }
  }

  /**
   * Accepts a search term input, passes the search term value to a Spotify
   * request, then returns the response as a list of tracks in JSON format.
   *
   * @param {string} term
   * @return {}
   */
  async search(term) {
    const url = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    const settings = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.getAccessToken()}`,
        "Content-Type": "application/json",
      },
    };

    const tracksList = [];

    await fetch(url, settings)
      .then((response) => response.json())
      .then(({ tracks }) => {
        const { items } = tracks;
        items.forEach((item) =>
          tracksList.push({
            id: item.id,
            name: item.name,
            artist: item.artists[0].name,
            album: item.album.name,
            uri: item.uri,
          })
        );
      });

    return tracksList;
  }

  /**
   * Writes the user's custom playlist in Jammming to their Spotify account.
   *
   * @param { string } playlistName
   * @param { string[] } trackURIs
   */
  async savePlaylist(playlistName, trackURIs) {
    if (!playlistName && !trackURIs) return;

    const accessToken = this.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
    let userID;

    await fetch(`https://api.spotify.com/v1/me`, {
      method: "GET",
      headers,
    })
      .then((response) => response.json())
      .then(({ id }) => (userID = id));

    let playlistID;

    await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
      method: "POST",
      headers,
      body: JSON.stringify({ name: playlistName }),
    })
      .then((response) => response.json())
      .then(({ id }) => (playlistID = id));

    
    console.log(userID);
    console.log(playlistID);
    console.log(trackURIs);
    
    await fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
      method: "POST",
      headers,
      body: JSON.stringify({ uris: trackURIs }),
    })
      .then((response) => response.json())
      .then(data => console.log(data));
      
    
  }
}

export default new Spotify();
