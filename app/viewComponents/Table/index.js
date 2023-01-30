import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MuiTable from '@material-ui/core/Table';
import styles from './styles';

export const Table = ({ classes, children }) => (
  <MuiTable
    classes={{
      root: classes.root,
    }}
  >
    {children}
  </MuiTable>
);

Table.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

Table.defaultProps = {
  children: '',
};

export TableRow from './components/TableRow';
export TableBody from './components/TableBody';
export TableCell from './components/TableCell';
export TableHeader from './components/TableHeader';
export TableHeadCell from './components/TableHeadCell';
export default withStyles(styles, { name: 'Table' })(Table);
