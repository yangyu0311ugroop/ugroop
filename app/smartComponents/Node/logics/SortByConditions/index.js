import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import { CONFIG_1, CONFIG_2, CONFIG_3, CONFIG_4 } from './config';

/**
 * Returns sorted ids by calculated medical and dietary data (good for sorting participants).
 */
export class SortByConditions extends React.PureComponent {
  render = () => {
    const { ids, children } = this.props;
    return children(ids);
  };
}

SortByConditions.propTypes = {
  // parent
  children: PropTypes.func.isRequired,
  ids: PropTypes.array,
};

SortByConditions.defaultProps = {
  ids: [],
};

export default compose(
  resaga(CONFIG_1),
  resaga(CONFIG_2),
  resaga(CONFIG_3),
  resaga(CONFIG_4),
)(SortByConditions);
