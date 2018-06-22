import React, { Component } from 'react';

export const AppContext = React.createContext();

class DataProvider extends Component {
  constructor(props) {
    super(props);

    this.state = { name: 'Max' }
  }

  storeCurrentUser = (user) => {
    this.setState({ user });
  }
  render() {
    return (
      <AppContext.Provider 
        value={{ 
          state: this.state,
          storeCurrentUser: () => this.storeCurrentUser()
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default DataProvider;