import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { AppContext } from '../../components/Provider';
import './styles.scss';

class SongProfile extends Component {
  constructor(props) {
    super(props);

    this.state = { song: {} };
  }
  
  componentDidMount() {
    const song = this.props.context.state.user.userUploads.find(song => song.id === this.props.match.params.songId);
    console.log(song);
    this.setState({ song });
  }

  render() {
    return (
      <div className="SongProfile">
        <video className="SongProfile__video" src={this.state.song.videoUrl} controls />
      </div>
    );  
  }
}

const SongProfileWithData = props => (
  <AppContext.Consumer>
    {context => (
      <SongProfile context={context} history={props.history} match={props.match} />
    )}
  </AppContext.Consumer>
);


export default withRouter(SongProfileWithData);