import React from "react";
import "./TrackList.css";
import { Track } from "../Track/Track";

export class TrackList extends React.Component {
  render() {
    const { tracks, onAdd, onRemove, isRemoval } = this.props;

    return (
      <div className="TrackList">
        {tracks.map((track, index) => (
          <Track
            key={index}
            track={track}
            onAdd={onAdd}
            onRemove={onRemove}
            isRemoval={isRemoval}
          />
        ))}
      </div>
    );
  }
}
