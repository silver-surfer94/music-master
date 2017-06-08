import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",

    }
  }

  search () {
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    const FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    console.log('FETCH_URL', FETCH_URL)
    fetch(FETCH_URL, {
      method: 'GET',
      headers: new Headers({
        Accept: "application/json",
        Authorization: "Bearer BQCJendPwwaObrLpwxvVEq9EkOuPX31hJMOiUcGC98DV04sml9zgZZEyVVjDB1XwgxbvpVIlLF8KmFvtwPhOEIYoOdYaCkwVEsTxdph_RUJY2n4uXZa7-hV8Yopj6PonE54y0-cbYDyZRURt",
      })
    })
    .then(response => response.json())
    .then(json => console.log('json', json));
  }

  render () {
    return (
      <div className='App'>
      <div className='App-title'>MusicMaster</div>
      <FormGroup>
        <InputGroup>
          <FormControl type='text' placeholder='search for an artist...'
            value={this.state.query}
            onChange={event => {this.setState({query: event.target.value})}}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                this.search()
              }
            }}/>
          <InputGroup.Addon onClick={() => this.search()}>
            <Glyphicon glyph='search'></Glyphicon>
          </InputGroup.Addon>
        </InputGroup>
      </FormGroup>
      <div className='Profile'>
        <div>Artist picure</div>
        <div>Artist name</div>
      </div>
      <div className='Gallery'>Gallery</div>
      </div>
    )
  }
}

export default App;



//GET https://accounts.spotify.com/authorize/?client_id=4cc020f3559f42fc8afdc84367044b4a&response_type=code&redirect_uri=http://localhost:3000/callback&scope=user-read-private%20user-read-email
