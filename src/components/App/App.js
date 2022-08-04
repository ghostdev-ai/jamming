import React from "react";
import "./App.css";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";
import { SearchBar } from "../SearchBar/SearchBar";
import Spotify from "../../util/Spotify";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

    this.state = {
      searchResults: [],
      playlistName: "New Playlist",
      playlistTracks: [],
    };
  }

  addTrack(track) {
    const { playlistTracks } = this.state;
    const inPlaylist = playlistTracks.find(({ id }) => track.id === id);

    if (typeof inPlaylist === "undefined") {
      this.setState({
        playlistTracks: [...playlistTracks, track],
      });
    }
  }

  removeTrack(track) {
    const { playlistTracks } = this.state;
    this.setState({
      playlistTracks: playlistTracks.filter(({ id }) => track.id !== id),
    });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  async savePlaylist() {
    const { playlistName, playlistTracks } = this.state;
    const trackURIs = playlistTracks.map(track => track.uri);

    await Spotify.savePlaylist(playlistName, trackURIs);
  
  }

  async search(term) {
    this.setState({
      searchResults: await Spotify.search(term),
    });
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              searchResults={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
