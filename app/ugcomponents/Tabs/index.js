import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';

export const stylesheet = {
  // indicator: {
  //   // display: 'none',
  // },
  // scrollButtonsAuto: {
  //   flex: '0',
  // },
  scrollButtons: {
    flex: 'none',
    width: 'unset',
  },
  scroller: {
    display: 'flex',
  },
  flexContainer: {
    display: 'flex',
  },
};

export const UGTabs = ({ classes, children, ...props }) => (
  <Tabs classes={classes} {...props}>
    {children}
  </Tabs>
);

UGTabs.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.node,
};
UGTabs.defaultProps = {};

export default withStyles(stylesheet, { name: 'UGTabs' })(UGTabs);
