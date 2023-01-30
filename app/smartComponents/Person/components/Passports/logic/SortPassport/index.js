import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { CONFIG } from './config';

export class SortPassport extends PureComponent {
  render = () => {
    const { children, sortedIds } = this.props;

    return children({ sortedIds });
  };
}

SortPassport.propTypes = {
  // hoc props

  // parent props
  children: PropTypes.func.isRequired,

  // resaga props
  sortedIds: PropTypes.array,
};

SortPassport.defaultProps = {
  sortedIds: [],
};

export default compose(resaga(CONFIG))(SortPassport);
