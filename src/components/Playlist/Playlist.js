import React from "react";
import './Playlist.css';
import { TrackList } from '../TrackList/TrackList';

export class Playlist extends React.Component {
    render() {
        const { playlistName, playlistTracks, onRemove } = this.props;
        return (
            <div className="Playlist">
                <input defaultValue={playlistName}/>
                <TrackList tracks={playlistTracks} onRemove={onRemove} isRemoval={true} />
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        );
    }
}

Playlist.defaultProps = {
    playlistName: 'New Playlist'
};