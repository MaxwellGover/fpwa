import React, { Component } from 'react';

import { storage, db } from "../../initializers/firebase";

class Uploader extends Component {
  constructor(props) {
    super(props);

    this.state = { }
  }

  handleUpload = (event) => {
    const file = event.target.files[0];
    const audioRef = storage.ref().child("audio");
    const songRef = audioRef.child(file.name);

    songRef.put(file)
      .then((snapshot) => { 
        console.log(snapshot.metadata)
        snapshot.ref.getDownloadURL()
          .then((downloadUrl) => { 
            db.collection('users').doc(this.props.user.id).collection('uploadedSongs').add({
              name: 'mySong',
              url: downloadUrl,
            })
            .then(() => { console.log('Song added to the db successfully')})
            .catch((error) => { console.warn(error)})
          });
        // Store url to user in db under uploadedSongs -> song: { title: '', url: ''}
      })
      .catch(() => {})
  }
  render() {
    return (
      <div>
        <input type="file" onChange={(event) => this.handleUpload(event)} />
      </div>
    );
  }
}

export default Uploader;