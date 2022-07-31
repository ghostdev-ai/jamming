import React from "react";
import "./Track.css";

export class Track extends React.Component {
  constructor(props) {
    super(props);
    this.renderAction = this.renderAction.bind(this);
    this.addTrack = this.addTrack.bind(this);
  }

  renderAction() {
    return this.props.isRemoval ? "-" : "+";
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  render() {
    const { name, artist, album } = this.props.track;
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{name}</h3>
          <p>{`${artist} | ${album}`}</p>
        </div>
        <button className="Track-action" onClick={this.addTrack}>
          {this.renderAction()}
        </button>
      </div>
    );
  }
}
