import React, { Component } from 'react';

import { AppContext } from '../../../../components/Provider';
import './styles.scss';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <h1 className="Header__displayName">{this.props.context.state.user.displayName}</h1>
        <div className="Header__buttonContainer">
        {!this.props.context.state.mobile &&
          <button className="Header__uploadButton">Upload a song</button>
        }
          <button className="Header__settingsButton">Settings</button>
        </div>
      </div>
    );
  }
}

const HeaderWithData = props => {
  return (
    <AppContext.Consumer>
      {context => (
        <Header context={context} history={props.history} match={props.match} />
      )}
    </AppContext.Consumer>
  );
};

export default HeaderWithData;