import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TableBody as MTableBody } from '@material-ui/core';
import PropTypes from 'prop-types';
import styles from './styles';

export const TableBody = ({ classes, children, ...props }) => (
  <MTableBody className={classes.root} {...props}>
    {children}
  </MTableBody>
);

TableBody.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

TableBody.defaultProps = {
  children: '',
};

export default withStyles(styles, { name: 'TableBody' })(TableBody);
