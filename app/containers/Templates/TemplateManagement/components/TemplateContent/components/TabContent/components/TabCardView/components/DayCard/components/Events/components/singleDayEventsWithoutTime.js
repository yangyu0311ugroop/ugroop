import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { EVENT_GROUPINGS } from 'utils/constants/events';
import { NODE_HAS_TIMES } from 'utils/constants/nodes';
import { withEventsOnDay } from 'smartComponents/Node/hoc';

export class SingleDayEventsWithoutTime extends React.PureComponent {
  componentDidMount() {
    if (
      this.props.singleDayEventsWithoutTime &&
      this.props.singleDayEventsWithoutTime.length > 0
    ) {
      this.props.hasEvents(true);
    }
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.singleDayEventsWithoutTime !==
        prevProps.singleDayEventsWithoutTime &&
      this.props.singleDayEventsWithoutTime.length !==
        prevProps.singleDayEventsWithoutTime.length
    ) {
      this.props.hasEvents(true);
    }
  }

  render = () => {
    const { singleDayEventsWithoutTime } = this.props;
    if (singleDayEventsWithoutTime && singleDayEventsWithoutTime.length > 0) {
      return singleDayEventsWithoutTime.map(this.props.renderEventIcon);
    }
    return null;
  };
}

SingleDayEventsWithoutTime.propTypes = {
  // hoc props
  renderEventIcon: PropTypes.func,
  singleDayEventsWithoutTime: PropTypes.array,
  hasEvents: PropTypes.func,
};

SingleDayEventsWithoutTime.defaultProps = {};

export default compose(
  withEventsOnDay({
    outputProp: 'singleDayEventsWithoutTime',
    grouping: EVENT_GROUPINGS.singleDayEvents,
    hasTime: NODE_HAS_TIMES.withoutTime,
    hideCancelled: true,
  }),
)(SingleDayEventsWithoutTime);
