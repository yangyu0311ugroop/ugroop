import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import ARRAY_HELPERS from 'utils/helpers/arrays';
import resaga from 'resaga';
import { CONFIG1 } from './config';
import EventsTimelines from './index';
export class EventsTimeLinesWithEventIds extends React.Component {
  // eslint-disable-next-line no-unused-vars
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (nextProps.id !== this.props.id) {
      return true;
    }
    if (!ARRAY_HELPERS.isSame(nextProps.eventIds, this.props.eventIds)) {
      return true;
    }
    if (nextProps.isCardOpen !== this.props.isCardOpen) {
      return true;
    }
    return false;
  }

  render = () => (
    <EventsTimelines
      id={this.props.id}
      eventIds={this.props.eventIds}
      isCardOpen={this.props.isCardOpen}
      openCards={this.props.openCards}
    />
  );
}

EventsTimeLinesWithEventIds.propTypes = {
  // hoc
  eventIds: PropTypes.array.isRequired,

  // parent
  id: PropTypes.number.isRequired,
  isCardOpen: PropTypes.bool,
  openCards: PropTypes.func,
};

EventsTimeLinesWithEventIds.defaultProps = {};

export default compose(resaga(CONFIG1))(EventsTimeLinesWithEventIds);
