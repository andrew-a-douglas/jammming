import React, { Component } from 'react';
import './SearchBar.css';


export default class SearchBar extends Component {

  constructor(props){
    let initState = '';
    if(sessionStorage.getItem("searchTerm")){
      //console.log('this worked ' + sessionStorage.getItem("searchTerm") );
      initState = sessionStorage.getItem("searchTerm");
    }

    super(props);
    
      this.state = {term: initState};
      
      
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }

  search(){

    //create a method called search that passes the state of the term to this.props.onSearch
    this.props.onSearch(this.state.term);
  }

  clearSearch(){
    sessionStorage.removeItem("searchTerm");

    this.setState({term: ''}, function () {
      //console.log('there is nothing here right? ' + this.state.term);
    });

  }

  handleTermChange(e){
    this.setState({ term: e.target.value });
  }

  render() {
    let spotifyAuthCheck = sessionStorage.getItem("spotifyAuth");
    if(spotifyAuthCheck){
      return (
        <div className="SearchBar">
        <div className="inputAndClear">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} value={this.state.term} />
        {this.state.term && <button className="SearchClear" onClick={this.clearSearch}>X</button>}
        </div>
        <button className="SearchButton" onClick={this.search}>SEARCH</button>
      </div>
    )
    } else {
      return (
        <div className="SearchBar">
        <img src='https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-icon-marilyn-scott-0.png' />
        <button className="SearchButton" onClick={this.search}>Connect to Spotify</button>
      </div>
      )
    }
  };
    
}
