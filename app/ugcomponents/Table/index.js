import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MTable from '@material-ui/core/Table';
import PropTypes from 'prop-types';
import styles from './styles';

export const Table = ({ classes, children, ...props }) => (
  <MTable classes={classes} {...props}>
    {children}
  </MTable>
);

Table.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

Table.defaultProps = {
  children: '',
};

export default withStyles(styles, { name: 'Table' })(Table);
