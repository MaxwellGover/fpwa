import React from 'react';

import { SignIn, SignUp } from './components';
import './styles.scss';

const Login = () => (
  <div className="Login">
    <SignUp />
    <SignIn />
  </div>
);

export default Login;