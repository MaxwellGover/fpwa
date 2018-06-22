import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import './App.scss';
import { auth } from "./initializers/firebase";
import SignUp from './components/SignUp/SignUp';
import { AppContext } from './components/Provider';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        console.log(user);
        console.log(this.props.context);
        // Get current users info from db and store it in context
      } else {
        console.log("No user signed in");
      }
    });
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route path="/" component={SignUp} />
        </BrowserRouter>
      </div>
    );
  }
}

const AppWithData = () => (
  <AppContext.Consumer>
    {(context) => <App context={context} />}
  </AppContext.Consumer>
);

export default AppWithData;
