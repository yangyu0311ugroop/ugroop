import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { EVENT_GROUPINGS } from 'utils/constants/events';
import { NODE_HAS_TIMES } from 'utils/constants/nodes';
import { withEventsOnDay } from 'smartComponents/Node/hoc';

export class SingleDayEventsWithTime extends React.PureComponent {
  componentDidMount() {
    if (
      this.props.singleDayEventsWithTime &&
      this.props.singleDayEventsWithTime.length > 0
    ) {
      this.props.hasEvents(true);
    }
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.singleDayEventsWithTime.length !==
        prevProps.singleDayEventsWithTime.length &&
      this.props.singleDayEventsWithTime !== prevProps.singleDayEventsWithTime
    ) {
      this.props.hasEvents(true);
    }
  }

  render = () => {
    const { singleDayEventsWithTime } = this.props;
    if (singleDayEventsWithTime && singleDayEventsWithTime.length > 0) {
      return singleDayEventsWithTime.map(this.props.renderEventIcon);
    }
    return null;
  };
}

SingleDayEventsWithTime.propTypes = {
  // hoc props
  renderEventIcon: PropTypes.func,
  singleDayEventsWithTime: PropTypes.array,
  hasEvents: PropTypes.func,
};

SingleDayEventsWithTime.defaultProps = {};

export default compose(
  withEventsOnDay({
    outputProp: 'singleDayEventsWithTime',
    grouping: EVENT_GROUPINGS.singleDayEvents,
    hasTime: NODE_HAS_TIMES.withTime,
    hideCancelled: true,
  }),
)(SingleDayEventsWithTime);
