import React, { Component } from 'react';
import './SearchBar.css';

export default class SearchBar extends Component {

  constructor(props){
    super(props);
    
      this.state = {term: ''};
      
      
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  search(){

    //create a method called search that passes the state of the term to this.props.onSearch
    this.props.onSearch(this.state.term);
  }

  handleTermChange(e){
    this.setState({ term: e.target.value });
  }

  render() {
    

    return (
        <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
        <button className="SearchButton" onClick={this.search}>SEARCH</button>
      </div>
    )
  }
}
