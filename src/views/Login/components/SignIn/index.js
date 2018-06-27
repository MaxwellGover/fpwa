import React, { Component } from 'react';
import { auth } from '../../../../initializers/firebase';

import './styles.scss';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleSignInUser = () => {
    auth.signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        // Redirect to profile page
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
        Sign In
      </div>
    );
  }
}

export default SignIn;