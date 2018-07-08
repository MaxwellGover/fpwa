import React from 'react';

import { Uploads, Uploader, VideoUploader } from '../../components';
import { Header } from './components';
import './styles.scss';

const Profile = (props) => {
  if (!props.context.state.user) { 
    return null;
  };

  const { user } = props.context.state;
  return (
    <div className="Profile">
      <Header />
      <Uploads history={props.history} />
    </div>
  );
}

export default Profile;
