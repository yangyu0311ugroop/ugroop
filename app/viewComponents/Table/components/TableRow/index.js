import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MuiTableRow from '@material-ui/core/TableRow';
import styles from './styles';

export const TableRow = ({ classes, children }) => (
  <MuiTableRow
    classes={{
      root: classes.root,
    }}
  >
    {children}
  </MuiTableRow>
);

TableRow.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

TableRow.defaultProps = {
  children: '',
};

export default withStyles(styles, { name: 'TableRow' })(TableRow);
