import React, { Component } from 'react';
import './App.css';
import Profile from './Profile.jsx';

class Exp extends Component {
  state = {users: []}

  componentDidMount() {
    fetch('/auth')
      .then(res => res.json())
      .then(auth => this.setState({ token: auth.access_token }));
  }

  render() {
    return (
      <div className="App">
        <h1>Users</h1>
        {this.state.token}
      </div>
    );
  }
}

export default Exp;
