import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { AppContext } from '../Provider';
import './styles.scss';

class Uploads extends Component {
  constructor(props) {
    super(props);
  }

  goToSongProfile = (upload) => {
    this.props.context.storeSongId(upload.id);
    console.log(this.props);
    this.props.history.push(`/users/${this.props.context.state.user.username}/${upload.id}`)
  }
  render() {
    const { context: { state: { user: { userUploads }}}} = this.props;

    return (
      <div>
        {userUploads.map(upload => {
          return (
            <div className="Uploads" key={upload.id}>
              <div className="Uploads__listItem" onClick={() => this.goToSongProfile(upload)}>
                <p className="Uploads__songName">
                  {upload.name}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const UploadsWithData = props => (
  <AppContext.Consumer>
    {context => (
      <Uploads context={context} history={props.history} />
    )}
  </AppContext.Consumer>
);

export default withRouter(UploadsWithData);