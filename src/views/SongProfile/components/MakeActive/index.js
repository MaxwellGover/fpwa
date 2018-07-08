import React, { Component } from 'react';

import './styles.scss';

class MakeActive extends Component {
  constructor(props) {
    super(props);

    this.state = { activated: false };
  }
  render() {
    return (
      <div className="MakeActive">
        <button className="MakeActive__button">Make this song active</button>
        <p className="MakeActive__helpText">
          You can only have one preview active at a time. 
          Users can only purchase full streams of active previews.
        </p>
      </div>
    );
  }
}

export default MakeActive;