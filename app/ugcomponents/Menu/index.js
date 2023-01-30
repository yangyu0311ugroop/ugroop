import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';

export const styleSheet = {
  ugMenu: {
    padding: '0',
    '& ul': {
      padding: 0,
    },
  },
};

export const UGMenu = ({ classes, children, ...props }) => (
  <Menu className={classes.ugMenu} {...props}>
    {children}
  </Menu>
);

UGMenu.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
};

export default withStyles(styleSheet, { name: 'UGMenu' })(UGMenu);
