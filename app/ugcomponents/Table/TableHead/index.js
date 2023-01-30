import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TableHead as MTableHead } from '@material-ui/core';
import PropTypes from 'prop-types';
import styles from './styles';

export const TableHead = ({ classes, children, ...props }) => (
  <MTableHead className={classes.root} {...props}>
    {children}
  </MTableHead>
);

TableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

TableHead.defaultProps = {
  children: '',
};

export default withStyles(styles, { name: 'TableHead' })(TableHead);
