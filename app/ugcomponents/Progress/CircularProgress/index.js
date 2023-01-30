/**
 * Created by Yang on 13/7/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

export const styleSheet = {
  root: {
    // Insert self style for our dialog box
  },
};

export const UGCircularProgress = ({ classes, ...props }) => (
  <CircularProgress className={classes.root} {...props} />
);

UGCircularProgress.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styleSheet)(UGCircularProgress);
