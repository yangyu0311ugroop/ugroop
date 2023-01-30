import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import MuiTableCell from '@material-ui/core/TableCell';
import { convertStyleClass } from 'utils/style-utils';
import styles from './styles';

export const TableHeadCell = ({
  classes,
  children,
  minWidth,
  centeredText,
  verticalAlign,
  padding,
}) => (
  <MuiTableCell
    classes={{
      root: classnames(
        classes.root,
        convertStyleClass(classes, `${minWidth}MinWidth`),
        convertStyleClass(classes, `${padding}Padding`),
        { [classes.centeredText]: centeredText },
        { [classes.verticalAlign]: verticalAlign },
      ),
    }}
  >
    {children}
  </MuiTableCell>
);

TableHeadCell.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  minWidth: PropTypes.string,
  centeredText: PropTypes.bool,
  verticalAlign: PropTypes.bool,
  padding: PropTypes.string,
};

TableHeadCell.defaultProps = {
  children: '',
  minWidth: '',
  centeredText: false,
  verticalAlign: false,
  padding: '',
};

export default withStyles(styles, { name: 'TableHeadCell' })(TableHeadCell);
