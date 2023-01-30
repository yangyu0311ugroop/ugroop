import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import styles from './styles';

function Li(props) {
  const { classes, className, children } = props;
  return <li className={classNames(classes.root, className)}>{children}</li>;
}

Li.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: PropTypes.any,
};

export const LiTest = Li;
export default withStyles(styles, { name: 'Li' })(Li);
