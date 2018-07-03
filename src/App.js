import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

import './App.scss';
import { auth } from "./initializers/firebase";
import { Profile, Login } from './views';
import { AppContext } from './components/Provider';
import { userQuery, userUploadsQuery } from './queries';

class App extends Component {
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {        
        userUploadsQuery(user.uid)
          .then((userUploads) => {
            userQuery(user.uid)
              .then((user) => { 
                this.props.context.storeCurrentUser({ ...user, userUploads });
              });
          });
      } else {
        this.props.history.push(`/login`);
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Route path="/login" render={() => <Login context={this.props.context} history={this.props.history} />} />
        <Route path="/users/:username" render={() => <Profile context={this.props.context} />} />
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
