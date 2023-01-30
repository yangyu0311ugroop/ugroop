import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';

export const styles = {
  root: {
    height: 5,
    backgroundColor: '#eee',
    borderRadius: 20,
  },
  bar: {
    borderRadius: 20,
  },
  barColorPrimary: {
    backgroundColor: '#34d058',
  },
  barColorSecondary: {
    backgroundColor: '#cb2431',
  },
};

export const UGLinearProgress = props => <LinearProgress {...props} />;

UGLinearProgress.propTypes = {
  classes: PropTypes.object.isRequired,
  timer: PropTypes.number,
};

export default withStyles(styles)(UGLinearProgress);
