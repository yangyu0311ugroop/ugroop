import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { compose } from 'redux';
import { EVENT_STORE_HOC } from 'datastore/eventStore/hoc';
import { EVENT_PATHS } from 'datastore/eventStore/constants';

export class EventWrapper extends PureComponent {
  render = () => {
    const { dataId, children, eventAttachments, event = {} } = this.props;

    return children({ eventAttachments, dataId, ...event });
  };
}

EventWrapper.propTypes = {
  // hoc props
  eventAttachments: PropTypes.array,
  // parent
  dataId: PropTypes.number,
  children: PropTypes.func,
  event: PropTypes.object,
};

EventWrapper.defaultProps = {
  eventAttachments: [],
};

export default compose(
  EVENT_STORE_HOC.selectEventProp({
    path: EVENT_PATHS.eventAttachments,
    outputProp: 'eventAttachments',
  }),
)(EventWrapper);
