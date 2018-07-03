import React from 'react';

import { Uploads, Uploader } from '../../components';

const Profile = (props) => {
  if (!props.context.state.user) { 
    return null;
  };

  const { user } = props.context.state;
  // TODO: Hide upload button if on mobile device
  return (
    <div>
      <h1>{user.username}</h1>
      <Uploader user={user} />
      <Uploads />
    </div>
  );
}

export default Profile;
