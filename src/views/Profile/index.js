import React from 'react';

import Uploader from './components/Uploader';

const Profile = (props) => {
  if (!props.context.state.user) { 
    return null;
  };

  const { user } = props.context.state;
  // TODO: Hide upload button if on mobile device
  return (
    <div>
      <h1>{user.username}</h1>
      <Uploader />
    </div>
  );
}

export default Profile;
