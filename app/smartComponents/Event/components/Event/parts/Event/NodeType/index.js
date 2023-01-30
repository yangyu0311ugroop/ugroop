/**
 * Created by stephenkarpinskyj on 13/9/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { EVENT } from 'utils/modelConstants';
import { Data } from 'ugcomponents/Inputs';
import inputs from './inputs';
import { CONFIG } from './config';

export class NodeType extends React.PureComponent {
  render = () => {
    const { value } = this.props;
    return <Data value={value} {...inputs.nodeType} />;
  };
}

NodeType.propTypes = {
  // parent
  id: PropTypes.number,

  // resga value
  value: PropTypes.string,
};

NodeType.defaultProps = {
  id: 0,

  value: EVENT,
};

export default resaga(CONFIG)(NodeType);
