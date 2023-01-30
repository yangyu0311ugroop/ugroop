import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styleSheet = {
  ugMenuItem: {
    borderBottom: '1px solid #e2e2e2',
    backgroundColor: '#fff',
    '&:last-child': {
      borderBottom: '0px solid #000',
    },
    '&:hover': {
      color: '#636e8a',
      backgroundColor: '#f6f8fa',
    },
    '&:focus': {
      backgroundColor: '#f6f8fa',
    },
  },
};

export const UGMenuItem = ({ classes, children, ...props }) => (
  <MenuItem className={classes.ugMenuItem} {...props}>
    {children}
  </MenuItem>
);

UGMenuItem.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
};

export default withStyles(styleSheet)(UGMenuItem);
