import React from "react";
import "./App.css";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.state = {
      searchResults: [
        {
          id: "0",
          name: "Tiny Dancer",
          artist: "Elton John",
          album: "Madman Across The Water",
        },
      ],
      playlistName: "New Playlist",
      playlistTracks: [
        {
          id: "0",
          name: "Tiny Dancer",
          artist: "Elton John",
          album: "Madman Across The Water",
        },
      ],
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
      playlistTracks: playlistTracks.filter(({ id }) => track.id !== id)
    });
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          {/* Add a SearchBar component */}
          <div className="App-playlist">
            <SearchResults {...this.state} onAdd={this.addTrack} />
            <Playlist
              searchResults={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
