import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { CONFIG_0, CONFIG } from './config';

export class SorterTable extends PureComponent {
  render = () => {
    const { children, sortedIds } = this.props;

    return children({ sortedIds });
  };
}

SorterTable.propTypes = {
  // hoc props

  // parent props
  children: PropTypes.func.isRequired,

  // resaga props
  sortedIds: PropTypes.array,
};

SorterTable.defaultProps = {
  sortedIds: [],
};

export default compose(
  resaga(CONFIG_0),
  resaga(CONFIG),
)(SorterTable);
