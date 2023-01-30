import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TableHead from '@material-ui/core/TableHead';
import styles from './styles';

export const TableHeader = ({ classes, children }) => (
  <TableHead className={classes.root}>{children}</TableHead>
);

TableHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

TableHeader.defaultProps = {
  children: '',
};

export default withStyles(styles, { name: 'TableHeader' })(TableHeader);
