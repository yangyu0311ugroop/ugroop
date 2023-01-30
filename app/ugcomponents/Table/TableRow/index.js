import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TableRow as MTableRow } from '@material-ui/core';
import PropTypes from 'prop-types';
import styles from './styles';

export const TableRow = ({ classes, children, ...props }) => (
  <MTableRow classes={classes} {...props}>
    {children}
  </MTableRow>
);

TableRow.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

TableRow.defaultProps = {
  children: '',
};
export default withStyles(styles, { name: 'TableRow' })(TableRow);
