import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import MuiTableCell from '@material-ui/core/TableCell';
import { convertStyleClass } from 'utils/style-utils';
import styles from './styles';

export const TableCell = ({
  classes,
  children,
  isCapitalized,
  centeredText,
  padding,
  ...rest
}) => (
  <MuiTableCell
    className={classnames(
      classes.root,
      {
        [classes.capitalize]: isCapitalized,
        [classes.centeredText]: centeredText,
      },
      convertStyleClass(classes, `${padding}Padding`),
    )}
    {...rest}
  >
    {children}
  </MuiTableCell>
);

TableCell.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  isCapitalized: PropTypes.bool,
  centeredText: PropTypes.bool,
  padding: PropTypes.string,
  // colSpan: PropTypes.number,
};

TableCell.defaultProps = {
  children: '',
  isCapitalized: false,
  centeredText: false,
  padding: '',
  // colSpan: 1,
};

export default withStyles(styles, { name: 'TableCell' })(TableCell);
