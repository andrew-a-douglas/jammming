import React, { Component } from 'react'
import './TrackList.css';
import Track from '../Track/Track';

export default class TrackList extends Component {
  
  render() {

    let tracksArr = this.props.tracks;
    let returnArr = tracksArr.map(track => {
      return (
        <Track track={track} key={track.id} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} inList={this.props.inList} type={this.props.type} />
      )
    });



    return (
        <div className="TrackList">
             {returnArr}
        </div>
    )
  }
}
