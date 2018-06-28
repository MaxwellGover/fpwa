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
    this.setState({ user });
  }

  render() {
    return (
      <AppContext.Provider 
        value={{ 
          state: this.state,
          storeCurrentUser: (user) => this.storeCurrentUser(user)
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default DataProvider;