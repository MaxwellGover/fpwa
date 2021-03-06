import React, { Component, Fragment } from 'react';

import { storage, db } from "../../initializers/firebase";

class Uploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      songUploaded: false,
      songName: '',
      downloadUrl: '',
    }
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
            this.setState({ songUploaded: true, downloadUrl });
          })
          .catch((error) => { console.log(error) })
      })
      .catch(() => {})
  }

  addSong = () => {
    db.collection('users').doc(this.props.user.id).collection('uploadedSongs').add({
      name: this.state.songName, // placeholder until user inputs a song name
      url: this.state.downloadUrl,
      active: false,
      streamsPurchased: 0,
      amountGrossed: 0,
      timesActive: 0,
      timestamp: new Date(),
    })
    .then((docRef) => {
      db.collection('users').doc(this.props.user.id).collection('uploadedSongs').doc(docRef.id).update({
        id: docRef.id
      })
    })
    .catch((error) => { console.warn(error)})
  }

  addSongName = (event) => {
    this.setState({ songName: event.target.value })
  }

  render() {
    return <div>
        <input type="file" accept="audio/*" onChange={event => this.handleUpload(event)} />
        {this.state.songUploaded && <Fragment>
            <input onChange={event => this.addSongName(event)} />
            <button onClick={() => this.addSong()}>Add song</button>
          </Fragment>}
      </div>;
  }
}

export default Uploader;