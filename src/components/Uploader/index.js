import React, { Component } from 'react';

import { storage } from "../../initializers/firebase";

class Uploader extends Component {
  render() {
    const audioRef = storage.ref().child("audio");
    return (
      <div>
        <button>Upload a song</button>
      </div>
    );
  }
}

export default Uploader;