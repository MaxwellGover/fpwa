import React from 'react';

import { Uploads, Uploader, VideoUploader } from '../../components';
import './styles.scss';

const Profile = (props) => {
  if (!props.context.state.user) { 
    return null;
  };

  const { user } = props.context.state;
  // TODO: Hide upload button if on mobile device
  return (
    <div className="Profile">
      <h1>{user.username}</h1>
      {/* <Uploader user={user} /> */}
      <Uploads history={props.history} />
      {/* <VideoUploader /> */}
    </div>
  );
}

export default Profile;
