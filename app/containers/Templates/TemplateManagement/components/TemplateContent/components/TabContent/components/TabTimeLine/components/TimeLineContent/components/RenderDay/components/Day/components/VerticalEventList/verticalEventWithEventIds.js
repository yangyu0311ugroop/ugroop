import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import ARRAY_HELPERS from 'utils/helpers/arrays';
import { CONFIG2 } from 'smartComponents/Node/hoc/withEventsOnDay/config';
import VerticalEventList from './index';
export class VerticalEventWithEventIds extends React.Component {
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
    <VerticalEventList
      id={this.props.id}
      eventIds={this.props.eventIds}
      hasChecklist={this.props.hasChecklist}
    />
  );
}

VerticalEventWithEventIds.propTypes = {
  // hoc
  eventIds: PropTypes.array.isRequired,

  // parent
  id: PropTypes.number.isRequired,
  hasChecklist: PropTypes.bool,
};

VerticalEventWithEventIds.defaultProps = {
  hasChecklist: false,
};

export default compose(resaga(CONFIG2))(VerticalEventWithEventIds);
