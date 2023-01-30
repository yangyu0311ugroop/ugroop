import React from 'react';
import PropTypes from 'prop-types';
import { NODE_CONSTANTS } from 'utils/constants/nodes';
import EventStartTime from 'smartComponents/Event/components/Event/parts/Event/StartTime';
import EventMiddleTime from 'smartComponents/Event/components/Event/parts/Event/MiddleTime';
import EventEndTime from 'smartComponents/Event/components/Event/parts/Event/EndTime';

/**
 * Only exists for extra convenience.
 */
export class EventTime extends React.PureComponent {
  renderTime = Component => <Component {...this.props} />;

  render = () => {
    const { position } = this.props;
    switch (position) {
      case NODE_CONSTANTS.POSITIONS.start:
        return this.renderTime(EventStartTime);
      case NODE_CONSTANTS.POSITIONS.middle:
        return this.renderTime(EventMiddleTime);
      case NODE_CONSTANTS.POSITIONS.end:
        return this.renderTime(EventEndTime);
      default:
        return null;
    }
  };
}

EventTime.propTypes = {
  // parent
  position: PropTypes.string,
};

EventTime.defaultProps = {
  position: null,
};

export default EventTime;
