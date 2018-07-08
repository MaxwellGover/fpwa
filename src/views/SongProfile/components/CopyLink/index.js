import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { AppContext } from '../../../../components/Provider';
import './styles.scss';

class CopyLink extends Component {
  constructor(props) {
    super(props);

    this.state = { linkCopied: false, url: '' };
  }

  openShareDialog = () => {
    navigator.share({ url: this.state.url })
  }

  render() {
    return <div className="CopyLink">
      <CopyToClipboard 
        text={window.location}
        onCopy={() => this.setState({ linkCopied: true, url: window.location }, () => {
          if ('share' in navigator) {
            this.openShareDialog();
          }
        })}
      >
        <button className="CopyLink__button">
          {this.state.linkCopied ? 'Copied!' : 'Copy link to this song'}
        </button>
      </CopyToClipboard>
      </div>;
  }
}

const CopyLinkWithData = props => (
  <AppContext.Consumer>
    {context => (
      <CopyLink context={context} />
    )}
  </AppContext.Consumer>
);

export default CopyLinkWithData;