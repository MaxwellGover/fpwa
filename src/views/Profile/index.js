import React from 'react';

const Profile = (props) => {
  if (!props.context.state.user) { 
    return null;
  };

  const { user } = props.context.state;
  
  return (
    <h1>{user.username}</h1>
  );
}

export default Profile;
