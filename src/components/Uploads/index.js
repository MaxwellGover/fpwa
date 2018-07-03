import React, { Component } from 'react';

import { AppContext } from '../Provider';

class Uploads extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { context: { state: { user: { userUploads }}}} = this.props;

    return (
      <div>
        {userUploads.map(upload => {
          return (
            <div key={upload.name}>{upload.name}</div>
          );
        })}
      </div>
    );
  }
}

const UploadsWithData = props => (
  <AppContext.Consumer>
    {context => (
      <Uploads context={context} />
    )}
  </AppContext.Consumer>
);

export default UploadsWithData;