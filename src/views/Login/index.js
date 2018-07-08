import React from 'react';

import { SignIn } from './components';
import './styles.scss';

const Login = (props) => (
  <div className="Login">
    <SignIn />
    <div className="Login__signUp">
      <p className="Login__helpText">
        New? 
      </p>
      <button className="Login__signUpButton" onClick={() => props.history.push('/sign-up')}>
        Create an account
      </button>
    </div>
  </div>
);

export default Login;