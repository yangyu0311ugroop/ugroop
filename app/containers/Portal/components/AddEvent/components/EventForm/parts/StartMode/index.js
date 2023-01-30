import withTimelineId from 'containers/Portal/components/AddEvent/components/EventForm/hocs/withTimelineId';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import startInputs from 'smartComponents/Event/components/Event/parts/Event/StartTime/inputs';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import { Data } from 'ugcomponents/Inputs';
import { NODE_TIME_MODES } from 'utils/constants/nodes';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './config';

export class StartMode extends PureComponent {
  dataMode = () => {
    const { node, startMode, timelineId } = this.props;

    if (!node) {
      return startMode;
    }

    const tempStartDay = EVENT_VIEW_HELPERS.tempStartDay(node);
    const tempStartTime = EVENT_VIEW_HELPERS.tempStartTime(node);

    if (tempStartDay === `${timelineId}`) {
      // return LOGIC_HELPERS.ifElse(
      //   tempStartTime,
      //   NODE_TIME_MODES.unanchoredAtTime,
      //   NODE_TIME_MODES.unanchored,
      // );

      // for some reasons return unanchoredAtTime doesn't work
      return NODE_TIME_MODES.unanchored;
    }

    return LOGIC_HELPERS.ifElse(
      tempStartTime,
      NODE_TIME_MODES.relativeAtTime,
      NODE_TIME_MODES.relative,
    );
  };

  render = () => <Data currentValue={this.dataMode()} {...startInputs.mode} />;
}

StartMode.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  timelineId: PropTypes.number,

  // parent props
  node: PropTypes.object,

  // resaga props
  startMode: PropTypes.string,
};

StartMode.defaultProps = {};

export default compose(
  withTimelineId,
  resaga(CONFIG),
)(StartMode);
