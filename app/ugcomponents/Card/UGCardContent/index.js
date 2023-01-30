/**
 * Created by paulcedrick on 6/16/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

export const UGCardContent = ({ classes, children, className }) => (
  <div className={`${classes.cardContent} ${className}`}>{children}</div>
);

UGCardContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object,
};

UGCardContent.defaultProps = {
  className: '',
};

export default withStyles(styles)(UGCardContent);
