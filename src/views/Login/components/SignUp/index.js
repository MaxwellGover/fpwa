import React, { Component } from 'react';

import { auth, db } from '../../../../initializers/firebase';
import './styles.scss';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      displayName: '',
      password: '',
      username: '',
    }
  }

  handleCreateNewUser = () => {
    auth
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        auth.onAuthStateChanged((user) => {
          if (user) {
            db.collection('users').doc(user.uid).set({
              email: this.state.email,
              displayName: this.state.displayName,
              username: this.state.username,
              id: user.uid,
            })
            .then(() => { console.log('User added to the db successfully')})
            .catch((error) => { console.warn(error)})
          } else {
            // TODO: Better error handling
            console.log('No user signed in')
          }
        });
      })
      .catch((error) => {
        // TODO: Better error handling
      });
  }
  
  handleOnChange = (e, statePropertyToUpdate) => {
    this.setState({ [statePropertyToUpdate]: e.target.value })
  }

  render() {
    return (
      <div className="SignUp">
        <div className="container">
          <input
            autoComplete='off'
            className="input emailInput"
            onChange={(e) => this.handleOnChange(e, 'email')}
            placeholder="Enter your email" 
            type="email" 
            value={this.state.email} 
          />
          <input
            autoComplete='off'
            className="input pwInput" 
            min={8} 
            onChange={(e) => this.handleOnChange(e, 'password')}
            type="password" 
            placeholder="Enter a password" 
            value={this.state.password} 
          />
          <input
            autoComplete='off'
            className="input usernameInput"  
            onChange={(e) => this.handleOnChange(e, 'username')}
            type="text" 
            placeholder="Pick a username" 
            value={this.state.username} 
          />
          <input
            autoComplete='off'
            className="input displayNameInput"  
            onChange={(e) => this.handleOnChange(e, 'displayName')}
            type="text" 
            placeholder="Pick a display name" 
            value={this.state.displayName} 
          />
          <button className="submitButton" onClick={() => this.handleCreateNewUser()}>
            Sign Up
          </button>
        </div>
      </div>
    );
  }
}

export default SignUp;