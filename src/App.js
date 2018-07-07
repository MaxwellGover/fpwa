import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

import './App.scss';
import { auth } from "./initializers/firebase";
import { Profile, Login, SongProfile } from './views';
import { AppContext } from './components/Provider';
import { userQuery } from './queries';

class App extends Component {
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        userQuery(user.uid)
          .then(user => {
            this.props.context.storeCurrentUser(user);
            this.props.history.push(`/users/${this.props.context.state.user.username}`);
          });
      } else {
        this.props.history.push(`/login`);
      }
    });
  }

  signOutUser = () => {
    auth.signOut().then(() => {
      // Sign-out successful.
      console.log('User signed out')
    }).catch(error => {
      // An error happened.
      console.log('Could not sign user out')
    });
  }

  render() {
    return (
      <div className="App">
        <nav className="App__nav">
          <a href="#" onClick={() => this.signOutUser()}>
            Sign out
          </a>
        </nav>
        <Route path="/login" render={() => <Login context={this.props.context} history={this.props.history} />} />
        <Route path="/users/:username" render={() => <Profile context={this.props.context} history={this.props.history} />} exact />
        <Route path="/users/:username/:songId" render={() => <SongProfile context={this.props.context} />} exact />
      </div>
    );
  }
}

const AppWithData = (props) => (
  <AppContext.Consumer>
    {(context) => <App context={context} history={props.history} match={props.match} />}
  </AppContext.Consumer>
);

export default withRouter(AppWithData);
