import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import ARRAY_HELPERS from 'utils/helpers/arrays';
import { CONFIG4 } from './config';
import Attachments from './index';
export class AttachmentWithEventIds extends React.Component {
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
    <Attachments
      variant={this.props.variant}
      id={this.props.id}
      eventIds={this.props.eventIds}
    />
  );
}

AttachmentWithEventIds.propTypes = {
  // hoc
  eventIds: PropTypes.array.isRequired,
  variant: PropTypes.string,
  // parent
  id: PropTypes.number.isRequired,
};

AttachmentWithEventIds.defaultProps = {};

export default compose(resaga(CONFIG4))(AttachmentWithEventIds);
