import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { TableCell as MTableCell } from '@material-ui/core';
import PropTypes from 'prop-types';
import styles from './styles';

export const TableCell = ({ classes, children, withPadding, ...props }) => (
  <MTableCell
    classes={{
      root: classNames(classes.root, { [classes.noPadding]: !withPadding }),
    }}
    {...props}
  >
    {children}
  </MTableCell>
);

TableCell.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  withPadding: PropTypes.bool,
};

TableCell.defaultProps = {
  children: '',
  withPadding: false,
};

export default withStyles(styles, { name: 'TableCell' })(TableCell);
