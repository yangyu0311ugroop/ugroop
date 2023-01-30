import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { EVENT_GROUPINGS } from 'utils/constants/events';
import { withEventsOnDay } from 'smartComponents/Node/hoc';

export class NonSingleDayEvents extends React.PureComponent {
  componentDidMount() {
    if (
      this.props.nonSingleDayEvents &&
      this.props.nonSingleDayEvents.length > 0
    ) {
      this.props.hasEvents(true);
    }
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.nonSingleDayEvents !== prevProps.nonSingleDayEvents &&
      this.props.nonSingleDayEvents.length !==
        prevProps.nonSingleDayEvents.length
    ) {
      this.props.hasEvents(true);
    }
  }

  render = () => {
    const { nonSingleDayEvents } = this.props;
    if (nonSingleDayEvents && nonSingleDayEvents.length > 0) {
      return nonSingleDayEvents.map(this.props.renderEventIcon);
    }
    return null;
  };
}

NonSingleDayEvents.propTypes = {
  // hoc props
  renderEventIcon: PropTypes.func,
  nonSingleDayEvents: PropTypes.array,
  hasEvents: PropTypes.func,
};

NonSingleDayEvents.defaultProps = {};

export default compose(
  withEventsOnDay({
    outputProp: 'nonSingleDayEvents',
    grouping: EVENT_GROUPINGS.nonSingleDayEvents,
    hideCancelled: true,
  }),
)(NonSingleDayEvents);
