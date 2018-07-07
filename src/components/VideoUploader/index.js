import React, { Component } from 'react';
import { db, storage } from '../../initializers/firebase';

import { AppContext } from '../Provider';
import './styles.scss';

class VideoUploader extends Component {
  state = {
    videoStream: '',
    uploadSuccessful: false,
    downloadUrl: '',
  }

  handleUploadVideo = (evt) => {
    console.log(evt.target.files[0]);
    const file = evt.target.files[0];
    const videoRef = storage.ref().child("video");
    const video = videoRef.child(file.name);

    video.put(file)
      .then((snapshot) => {
        console.log(snapshot.metadata)
        snapshot.ref.getDownloadURL()
          .then((downloadUrl) => {
            this.setState({ uploadSuccessful: true, downloadUrl }, () => this.saveToDb());
          })
          .catch((error) => { console.log(error) })
      })
      .catch(() => { })
  }

  saveToDb = () => {
    db.collection('users').doc(this.props.context.state.user.id).collection('uploadedSongs').doc(this.props.context.state.songId).update({
      videoUrl: this.state.downloadUrl,
    })
      .then(() => { console.log('Video added to the db successfully') })
      .catch((error) => { console.warn(error) })
  }

  render() {
    if (!this.props.context.state.mobile) {
      return null;
    }

    return (
      <button className="VideoUploader">
        <input type="file" accept="video/*" onChange={(evt) => this.handleUploadVideo(evt)} className="VideoUploader__input" />
      </button>
    );
  }
}

const VideoUploaderWithData = props => (
  <AppContext.Consumer>
    {context => (
      <VideoUploader context={context} />
    )}
  </AppContext.Consumer>
);

export default VideoUploaderWithData;