import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import ARRAY_HELPERS from 'utils/helpers/arrays';
import { CONFIG1 } from './config';
import EventsOnDay from './index';
export class EventOnDayWithEventIds extends React.Component {
  // eslint-disable-next-line no-unused-vars
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (nextProps.id !== this.props.id) {
      return true;
    }
    if (!ARRAY_HELPERS.isSame(nextProps.eventIds, this.props.eventIds)) {
      return true;
    }
    if (nextProps.variant !== this.props.variant) {
      return true;
    }
    return false;
  }

  render = () => {
    const { id, eventIds, children, ...rest } = this.props;
    return (
      <EventsOnDay id={this.props.id} eventIds={this.props.eventIds} {...rest}>
        {children}
      </EventsOnDay>
    );
  };
}

EventOnDayWithEventIds.propTypes = {
  // hoc
  eventIds: PropTypes.array.isRequired,

  // parent
  id: PropTypes.number.isRequired,
  children: PropTypes.any,
  variant: PropTypes.string,
};

EventOnDayWithEventIds.defaultProps = {};

export default compose(resaga(CONFIG1))(EventOnDayWithEventIds);
