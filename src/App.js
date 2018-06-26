import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

import './App.scss';
import { auth, db } from "./initializers/firebase";
import SignUp from './components/SignUp/SignUp'; // Move to views;
import { Profile } from './views';
import { AppContext } from './components/Provider';

class App extends Component {
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        const usersRef = db.collection('users').doc(user.uid);
        usersRef
          .get()
          .then(doc =>
            this.props.context.storeCurrentUser(
              doc.data(),
              this.props.history.push(
                `/users/${doc.data().username}` // TODO: Change to username. Figure out how to get updated state async
              )
            ),
          );
      } else {
        this.props.history.push(`/sign-up`);
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Route path="/sign-up" component={SignUp} />
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
