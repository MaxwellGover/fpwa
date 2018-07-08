import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

import './App.scss';
import { auth } from "./initializers/firebase";
import { Profile, Login, SongProfile } from './views';
import { SignUp } from './components';
import { AppContext } from './components/Provider';
import { userQuery } from './queries';

class App extends Component {
  componentWillMount() {
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
      console.log('User signed out');
      this.props.history.push('/');
    }).catch(error => {
      // An error happened.
      console.log('Could not sign user out')
    });
  }

  render() {
    return (
      <div className="App">
        <nav className="App__nav">
          <div>
          {this.props.history.location.pathname !== '/login' &&
            <i className="material-icons App__backIcon" onClick={() => this.props.history.goBack()}>
              keyboard_arrow_left
            </i>
          }
          </div>
          <span className="App__logo">
            FLAMMABLE
          </span>
          <div>
          {this.props.context.state.user &&
            <i className="material-icons App__signOutIcon" onClick={() => this.signOutUser()}>
              launch
            </i>
          }
          </div>
        </nav>
        <Route path="/login" render={() => <Login context={this.props.context} history={this.props.history} />} />
        <Route path="/users/:username" render={() => <Profile context={this.props.context} history={this.props.history} />} exact />
        <Route path="/users/:username/:songId" render={() => <SongProfile context={this.props.context} history={this.props.history} match={this.props.match} />} exact />
        <Route path="/sign-up" render={() => <SignUp context={this.props.context} history={this.props.history} match={this.props.match} />} />
      </div>
    );
  }
}

const AppWithData = (props) => {
  return (
    <AppContext.Consumer>
      {(context) => <App context={context} history={props.history} match={props.match} />}
    </AppContext.Consumer>
  )
};

export default withRouter(AppWithData);
