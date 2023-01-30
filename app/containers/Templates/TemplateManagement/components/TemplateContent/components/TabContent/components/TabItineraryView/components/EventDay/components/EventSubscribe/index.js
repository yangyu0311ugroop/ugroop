import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import { SHORTEST_ITINERARY_DURATION } from 'utils/constants/dateTime';
import { NODE_CONSTANTS } from 'utils/constants/nodes';
import { NODE_HELPERS } from 'utils/helpers/nodes';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import { CONFIG, CONFIG_DATA } from './config';

export class EventSubscribe extends React.PureComponent {
  componentDidMount = () => {
    const { index, updateParentEvents, startingUp } = this.props;
    updateParentEvents(this.makeEvent(this.props), !startingUp || index === 0);
  };

  componentDidUpdate = prevProps => {
    const { updateParentEvents } = this.props;
    if (
      prevProps.startTime !== this.props.startTime ||
      prevProps.endTime !== this.props.startTime
    ) {
      updateParentEvents(this.makeEvent(this.props), true);
    }
  };

  componentWillUnmount = () => {
    const { id, position, updateParentEvents } = this.props;
    updateParentEvents(this.makeEvent({ id, position }), true);
  };

  makeEventTime = props => {
    const { position, renderSection, startTime, endTime } = props;

    // Let pins have short/negative durations
    const isTooShort =
      renderSection === 'content' &&
      NODE_HELPERS.calculateDuration(startTime, endTime).as('m') <
        MOMENT_HELPERS.createDuration(SHORTEST_ITINERARY_DURATION).as('m');

    // Big calendar always uses start time for pins
    const isStartEnd =
      renderSection === 'ceiling' && position === NODE_CONSTANTS.POSITIONS.end;

    const end = isTooShort
      ? MOMENT_HELPERS.addDuration(startTime, SHORTEST_ITINERARY_DURATION)
      : endTime;
    const start = isStartEnd ? endTime : startTime;

    const convert = time =>
      time ? MOMENT_HELPERS.setTimeZone(time).toDate() : time;
    return { startTime: convert(start), endTime: convert(end) };
  };

  makeEvent = (props = {}) => {
    const { id, dataId, position, renderSection, type, subtype } = props;
    return {
      id,
      dataId,
      position,
      renderSection,
      type,
      subtype,
      ...this.makeEventTime(props),
    };
  };

  render = () => null;
}

EventSubscribe.propTypes = {
  // parent
  id: PropTypes.number.isRequired,
  position: PropTypes.string.isRequired,
  updateParentEvents: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  renderSection: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  startingUp: PropTypes.bool,
  // resaga
  startTime: PropTypes.string,
  endTime: PropTypes.string,
};

EventSubscribe.defaultProps = {
  renderSection: null,
  startingUp: false,

  startTime: null,
  endTime: null,
};

export default compose(
  resaga(CONFIG),
  resaga(CONFIG_DATA),
)(EventSubscribe);
