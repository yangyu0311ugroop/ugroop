import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import endInputs from 'smartComponents/Event/components/Event/parts/Event/EndTime/inputs';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import { Data } from 'ugcomponents/Inputs';
import { NODE_TIME_MODES } from 'utils/constants/nodes';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './config';

export class EndMode extends PureComponent {
  dataMode = () => {
    const { node, endMode } = this.props;

    if (!node) {
      return endMode;
    }

    const tempEndTime = EVENT_VIEW_HELPERS.tempEndTime(node);

    return LOGIC_HELPERS.ifElse(
      tempEndTime,
      NODE_TIME_MODES.relativeAtTime,
      NODE_TIME_MODES.relative,
    );
  };

  render = () => <Data currentValue={this.dataMode()} {...endInputs.mode} />;
}

EndMode.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  node: PropTypes.object,

  // resaga props
  endMode: PropTypes.string,
};

EndMode.defaultProps = {
  endMode: NODE_TIME_MODES.relative,
};

export default compose(resaga(CONFIG))(EndMode);
