import React, { Component } from 'react'
import './Track.css' 

export default class Track extends Component {

  constructor(props){
    super(props);

    this.state = {
      playOrPause: 'Sample'
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }


  /* componentDidMount() {
    this.state.audio.addEventListener('ended', () => this.setState({ play: false }));
  }
  
  componentWillUnmount() {
    this.state.audio.removeEventListener('ended', () => this.setState({ play: false }));  
  }

  togglePlay = () => {
    this.setState({ play: !this.state.play }, () => {
      this.state.play ? this.state.audio.play() : this.state.audio.pause();
    });
  }*/
  
  renderAction () {
    if (this.props.isRemoval){
      return <button className="Track-action" onClick={this.removeTrack}>-</button>;
    } else {
      return <button className="Track-action" onClick={this.addTrack} >+</button>;
    }
  }

  addTrack(){
    this.props.onAdd(this.props.track);
  }

  removeTrack(){
    this.props.onRemove(this.props.track);
  }

  handleClick(){
    this.props.playButton(this.props.track.preview);
    //this.props.playButton(this.props.track.preview);
  }

  render() {
    //don't render the track item (of search-type) if it's already in the playlist. 
    if(this.props.type === 'search' && this.props.inList(this.props.track.id)) {
      return;
    }

    return (
        <div className="Track">
        <div className="Track-information">
          <div className="Track-toprow">
            <h3>{this.props.track.name}</h3>
            <button className="Track-preview" onClick={this.handleClick}>{this.props.playPause ? '||' : 'Sample'}</button>
          </div>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {this.renderAction()}
      </div>
    )

  }
}
