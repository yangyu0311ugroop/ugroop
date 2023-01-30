import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const style = {
  adminBackground: {
    background: '#f6f8fa',
    width: '100%',
  },
};

export function PrintLayout({ children, classes }) {
  return <div className={classes.adminBackground}>{children}</div>;
}

PrintLayout.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
};

PrintLayout.defaultProps = {
  classes: {},
};

export default withStyles(style, { name: 'PrintLayout' })(PrintLayout);
