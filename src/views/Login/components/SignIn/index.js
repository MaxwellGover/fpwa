import React, { Component } from 'react';
import { auth, db } from '../../../../initializers/firebase';

import './styles.scss';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleOnChange = (e, statePropertyToUpdate) => {
    this.setState({ [statePropertyToUpdate]: e.target.value })
  }

  handleSignInUser = () => {
    auth.signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        // Redirect to profile page
        auth.onAuthStateChanged(user => {
          if (user) {
            const usersRef = db.collection('users').doc(user.uid);
            usersRef
              .get()
              .then(doc =>
                this.props.context.storeCurrentUser(
                  doc.data(),
                  this.props.history.push(
                    `/users/${doc.data().username}`
                  )
                ),
              );
          } else {
            this.props.history.push(`/login`);
          }
        });
      })
      .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }

  render() {
    return (
      <div className="SignIn">
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
        <button className="SignIn__button" onClick={() => this.handleSignInUser()}>Sign In</button>
      </div>
    );
  }
}

export default SignIn;