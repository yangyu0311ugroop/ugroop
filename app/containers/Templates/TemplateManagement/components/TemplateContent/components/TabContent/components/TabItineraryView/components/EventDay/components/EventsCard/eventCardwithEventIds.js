import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import ARRAY_HELPERS from 'utils/helpers/arrays';
import { CONFIG1 } from './config';
import EventsCard from './index';
export class EventCardWithEventIds extends React.Component {
  // eslint-disable-next-line no-unused-vars
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (nextProps.id !== this.props.id) {
      return true;
    }
    if (!ARRAY_HELPERS.isSame(nextProps.eventIds, this.props.eventIds)) {
      return true;
    }
    return false;
  }

  render = () => (
    <EventsCard id={this.props.id} eventIds={this.props.eventIds} showLabel />
  );
}

EventCardWithEventIds.propTypes = {
  // hoc
  eventIds: PropTypes.array.isRequired,

  // parent
  id: PropTypes.number.isRequired,
};

EventCardWithEventIds.defaultProps = {};

export default compose(resaga(CONFIG1))(EventCardWithEventIds);
