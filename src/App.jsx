import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile.jsx';
import Gallery from './Gallery.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      token: "",
      artist: null,
      tracks: []

    }
  }

  componentDidMount() {
    fetch('/auth')
      .then(res => res.json())
      .then(auth => this.setState({ token: auth.access_token }));
  }

  search() {
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/';

    console.log('FETCH_URL', FETCH_URL);
    fetch(FETCH_URL, {
      method: 'GET',
      headers: new Headers({
        Authorization: "Bearer " + this.state.token
      })
    })
    .then(response => response.json())
    .then(json => {
      const artist = json.artists.items[0];
      this.setState({artist})

      FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`;
      fetch (FETCH_URL, {
        method: 'GET',
        headers: new Headers ({
          Authorization: "Bearer " + this.state.token
        })
      })
      .then(response => response.json())
      .then(json => {
        console.log('artist\'s top tracks', json);
        const { tracks } = json;
        this.setState({tracks});
      })
    });

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
      {
        this.state.artist !== null
      ? <div>
      <Profile artist = {this.state.artist}/>
      <Gallery
        tracks={this.state.tracks}
        />
      </div>

      : <div></div>
  }
  </div>
    )

  }
}

export default App;



//GET https://accounts.spotify.com/authorize/?client_id=4cc020f3559f42fc8afdc84367044b4a&response_type=code&redirect_uri=http://localhost:3000/callback&scope=user-read-private%20user-read-email
