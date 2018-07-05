import React, { Component } from 'react';

import { AppContext } from '../Provider';

class VideoUploader extends Component {
  state = {
    videoStream: ''
  }
  
  handleGetUserMedia = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        /* use the stream */
        const videoPlayer = document.getElementById('player');
        videoPlayer.srcObject = stream;
        this.setState({ videoStream: stream })
        console.log(stream)
      })
      .catch(err => {
        /* handle the error */
        console.log(err)
      });
  }

  handleUploadVideo = (evt) => {
    // const file = event.target.files[0];
    console.log(evt.target.files[0])
  }

  startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then(stream => {
        /* use the stream */
        const videoPlayer = document.getElementById("player");
        videoPlayer.srcObject = stream;
        this.setState({ videoStream: stream });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        setTimeout(() => {
          mediaRecorder.stop();
          mediaRecorder.ondataavailable = e => console.log(e.data);
         // TODO: Find way to get this file in a form where it can be uploaded
        }, 3000);
      })
      .catch(err => {
        /* handle the error */
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        <video src={this.state.videoStream} id="player" autoPlay />
        <canvas id='canvas' height="300px" width="300px"></canvas>
        <input type="file" accept="video/*" onChange={(evt) => this.handleUploadVideo(evt)}/>
        <button onClick={() => this.handleGetUserMedia()}>Upload video</button>
        <button onClick={() => this.startRecording()}>RECORD</button>
      </div>
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