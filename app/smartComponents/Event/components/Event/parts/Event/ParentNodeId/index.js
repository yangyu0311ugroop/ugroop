/**
 * Created by stephenkarpinskyj on 13/9/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { Data } from 'ugcomponents/Inputs';
import inputs from './inputs';
import { CONFIG } from './config';

export class ParentNodeId extends React.PureComponent {
  render = () => {
    const { value, defaultValue } = this.props;
    return <Data value={value || defaultValue} {...inputs.parentNodeId} />;
  };
}

ParentNodeId.propTypes = {
  // parent
  id: PropTypes.number,

  // resga value
  value: PropTypes.number,
  defaultValue: PropTypes.number,
};

ParentNodeId.defaultProps = {
  id: 0,

  value: 0,
  defaultValue: 0,
};

export default resaga(CONFIG)(ParentNodeId);
