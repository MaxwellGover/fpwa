import React, { Component } from 'react';

export const AppContext = React.createContext();

class DataProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  storeCurrentUser = (user) => {
    this.setState({ user }, () => this.state.user );
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