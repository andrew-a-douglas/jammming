import React, { Component } from 'react'
import TrackList from '../TrackList/TrackList';
import './Playlist.css'

export default class Playlist extends Component {

  constructor(props){

    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);

  }

  handleNameChange(e){
    this.props.onNameChange(e.target.value);
  }

  render() {
    return (
        <div className="Playlist">
        <input defaultValue={'Unnamed Playlist'} onChange={this.handleNameChange} />
        <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true} type="playlist" playButton={this.props.playButton} playPause={this.props.playPause} />
        <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
      </div>
    )
  }
}
