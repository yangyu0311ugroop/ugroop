import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { CONFIG } from './config';

export class SortByLikes extends PureComponent {
  render = () => {
    const { children, sortedChildren } = this.props;

    return children({ sortedChildren });
  };
}

SortByLikes.propTypes = {
  // hoc props

  // parent props
  children: PropTypes.func.isRequired,

  // resaga props
  sortedChildren: PropTypes.array,
};

SortByLikes.defaultProps = {
  sortedChildren: [],
};

export default compose(resaga(CONFIG))(SortByLikes);
