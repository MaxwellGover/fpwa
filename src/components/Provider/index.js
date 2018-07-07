import React, { Component } from 'react';

import { isMobile } from '../../helpers';

export const AppContext = React.createContext();

class DataProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    this.setState({ mobile: isMobile() });
  }

  storeCurrentUser = (user) => {
    this.setState({ user }, () => {
      // this.props.history.push(`/users/${this.props.context.state.user.username}`);
    });
  }

  storeSongId = (songId) => {
    this.setState({ songId });
  }

  render() {
    return (
      <AppContext.Provider 
        value={{ 
          state: this.state,
          storeCurrentUser: (user) => this.storeCurrentUser(user),
          storeSongId: (songId) => this.storeSongId(songId)
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default DataProvider;