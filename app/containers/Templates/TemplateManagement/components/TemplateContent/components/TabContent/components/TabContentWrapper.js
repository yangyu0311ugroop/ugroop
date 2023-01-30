import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  tab: {
    paddingBottom: '60vh',
  },
};

export const Tab = ({ classes, children }) => (
  <div className={classes.tab}>{children}</div>
);

Tab.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

export default withStyles(styles)(Tab);
