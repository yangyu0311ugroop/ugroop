/**
 * Created by stephenkarpinskyj on 30/9/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import { CONFIG } from './config';

export class EventDataId extends React.PureComponent {
  render = () => {
    const { children, dataId } = this.props;
    return children(dataId);
  };
}

EventDataId.propTypes = {
  // parent
  children: PropTypes.func.isRequired,
  id: PropTypes.number, // eslint-disable-line react/no-unused-prop-types

  // resaga value
  dataId: PropTypes.number,
};

EventDataId.defaultProps = {
  id: 0,

  dataId: 0,
};

export default compose(resaga(CONFIG))(EventDataId);
