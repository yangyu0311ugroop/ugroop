import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { SORT_BY, ALL_VALUES } from './config';

export class SortBy extends PureComponent {
  render = () => {
    const { children, ids, sortedIds } = this.props;

    return children({ ids, sortedIds });
  };
}

SortBy.propTypes = {
  // parent props
  children: PropTypes.func.isRequired,
  ids: PropTypes.array,

  // resaga props
  sortedIds: PropTypes.array,
};

SortBy.defaultProps = {
  ids: [],
  sortedIds: [],
};

export default compose(
  resaga(SORT_BY),
  resaga(ALL_VALUES),
)(SortBy);
