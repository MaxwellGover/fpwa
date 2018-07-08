import React from 'react';

import { AppContext } from '../../../../components/Provider';
import './styles.scss';

const Prompt = (props) => {
  if (props.context.state.mobile) {
    return (
      <div className="Prompt">
        <p className="Prompt__helpText">
          Record a video
        </p>
      </div>
    );
  }
  return (
    <div className="Prompt">
      <p className="Prompt__helpText">
        Welcome to your song page. To upload or record a video preview for this song please visit URL on a mobile device.
      </p>
    </div>
  );
}

const PromptWithData = props => {
  return (
    <AppContext.Consumer>
      {context => (
        <Prompt context={context} history={props.history} match={props.match} />
      )}
    </AppContext.Consumer>
  );
};

export default PromptWithData;