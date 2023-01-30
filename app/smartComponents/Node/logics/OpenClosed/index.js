import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { ALL_CHECKLISTS, CHECKITEMS_STATUS } from './config';

export class OpenClosed extends PureComponent {
  render = () => {
    const { children, open, closed } = this.props;

    return children({ open, closed });
  };
}

OpenClosed.propTypes = {
  // parent props
  children: PropTypes.func.isRequired,

  // resaga props
  open: PropTypes.number,
  closed: PropTypes.number,
};

OpenClosed.defaultProps = {
  open: 0,
  closed: 0,
};

export default compose(
  resaga(ALL_CHECKLISTS), // step 1: get all checkitem IDs
  resaga(CHECKITEMS_STATUS), // step 2: get all statuses then count outstanding and completed
)(OpenClosed);
