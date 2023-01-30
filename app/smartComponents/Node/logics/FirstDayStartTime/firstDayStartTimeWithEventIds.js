import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import ARRAY_HELPERS from 'utils/helpers/arrays';
import { CONFIG1 } from './config';
import FirstDayStartTime from './index';
export class FirstDayStartTimeWithEventIds extends React.Component {
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

  render = () => {
    const { id, eventIds, template } = this.props;
    return (
      <FirstDayStartTime id={id} template={template} eventIds={eventIds} />
    );
  };
}

FirstDayStartTimeWithEventIds.propTypes = {
  // hoc
  eventIds: PropTypes.array,

  // parent
  id: PropTypes.number.isRequired,
  template: PropTypes.number.isRequired,
};

FirstDayStartTimeWithEventIds.defaultProps = {};

export default compose(resaga(CONFIG1))(FirstDayStartTimeWithEventIds);
