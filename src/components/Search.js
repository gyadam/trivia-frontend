import React, { Component } from 'react';
import {FaSearch} from 'react-icons/fa';

class Search extends Component {
  state = {
    query: '',
  }

  getInfo = (event) => {
    event.preventDefault();
    this.props.submitSearch(this.state.query)
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    })
  }

  render() {
    return (
      <form onSubmit={this.getInfo}>
        <input
          placeholder="Search questions..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
          className="search-input"
        />
        <button type="submit" className="searchButton">
          <FaSearch></FaSearch>
        </button>
      </form>
    )
  }
}

export default Search
