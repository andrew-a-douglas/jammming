import React from 'react';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import './App.css';
import Spotify from '../../util/Spotify';

export default class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
        searchResults: [],
        playlistName: 'placeHolder',
        playlistTracks: [],
        play: false,
        audio: new Audio('')   

    }

    //Binders
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.isInList = this.isInList.bind(this);
    this.togglePlay = this.togglePlay.bind(this);

  }

  componentDidMount() {
    this.state.audio.addEventListener('ended', () => this.setState({ play: false }));
  }
  
  componentWillUnmount() {
    this.state.audio.removeEventListener('ended', () => this.setState({ play: false }));  
  }

  togglePlay(trackUrl){

    if (this.state.play){

        this.state.audio.pause();
        this.setState({ play: !this.state.play });
        return;
      
    } 

    this.setState({ audio: new Audio(trackUrl)}, 
      () => {
        this.setState({ play: !this.state.play }, () => {
          this.state.audio.play();
        });

      })
  }

  addTrack(track){
    let PLArr = this.state.playlistTracks;
    let PLArrIDs = PLArr.map(x => x.id);
    let trackId = track.id;
    if (PLArrIDs.includes(trackId)) {
      return;
    }
    PLArr.push(track);
    //console.log(PLArr); //Testing the function. 
    this.setState({ playlistTracks: PLArr }) 
    
  }

  removeTrack(track){
    let PLArr = this.state.playlistTracks;
    let trackId = track.id;
    let newArr = PLArr.filter(x => x.id !== trackId);
    this.setState({ playlistTracks: newArr});
  }

  updatePlaylistName(name){
    this.setState({ playlistName: name });
  }

  savePlaylist(){
    let PLTracks = this.state.playlistTracks;
    let trackURIs = PLTracks.map(x => x.uri);
    //In a later step, I will pass the trackURIs array and playlistName to a method that will 
    //save the user???s playlist to their account.
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }

  isInList(id){
    let newArr = this.state.playlistTracks.map(x => x.id)
    //console.log('isInList Ran.', id, newArr)
    if (newArr.includes(id)){
      return true;
    } else {
      return false;
    }
  }

  search(term){
    //set search tearm to session Storage
    sessionStorage.setItem("searchTerm", term);

    //console.log(term);
    Spotify.search(term).then(searchResults => {
      
        this.setState({ searchResults: searchResults });
        
    })
  }

  

  render() {

    if (sessionStorage.getItem("searchTerm")) {
      // Restore the contents of the text field
      //console.log("the search term is " + sessionStorage.getItem("searchTerm"));
      //can't remember what this was for!! maybe just testing...
    }
    


    return (
      <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={this.search} />
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} inList={this.isInList} playButton={this.togglePlay} playPause={this.state.play} />
          <Playlist playlistName={this.state.playlistname} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} playButton={this.togglePlay} playPause={this.state.play} />
        </div>
      </div>
      
    </div>
    );


    }
}

    