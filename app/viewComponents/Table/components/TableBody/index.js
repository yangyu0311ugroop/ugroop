import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MuiTableBody from '@material-ui/core/TableBody';
import styles from './styles';

export const TableBody = ({ classes, children }) => (
  <MuiTableBody className={classes.root}>{children}</MuiTableBody>
);

TableBody.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

TableBody.defaultProps = {
  children: '',
};

export default withStyles(styles, { name: 'TableBody' })(TableBody);
