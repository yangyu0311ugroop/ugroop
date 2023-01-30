import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import ARRAY_HELPERS from 'utils/helpers/arrays';
import resaga from 'resaga';
import { CONFIG1 } from './config';
import Events from './index';
export class EventIds extends React.Component {
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

  render = () => <Events id={this.props.id} eventIds={this.props.eventIds} />;
}

EventIds.propTypes = {
  // hoc
  eventIds: PropTypes.array.isRequired,

  // parent
  id: PropTypes.number.isRequired,
};

EventIds.defaultProps = {};

export default compose(resaga(CONFIG1))(EventIds);
