import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { CONFIG } from './config';

export class SortPhones extends PureComponent {
  render = () => {
    const { children, sortedIds } = this.props;

    return children({ sortedIds });
  };
}

SortPhones.propTypes = {
  // hoc props

  // parent props
  children: PropTypes.func.isRequired,

  // resaga props
  sortedIds: PropTypes.array,
};

SortPhones.defaultProps = {
  sortedIds: [],
};

export default compose(resaga(CONFIG))(SortPhones);
