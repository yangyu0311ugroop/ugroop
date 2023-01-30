import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'components/material-ui';
import styles from './styles';

export const A = props => {
  const { classes, className, children, href, ...rest } = props;

  return (
    <a className={classNames(classes.root, className)} href={href} {...rest}>
      {children}
    </a>
  );
};

A.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  className: PropTypes.string,
  children: PropTypes.any,
  href: PropTypes.string,
};

A.defaultProps = {
  className: null,
  children: null,
  href: '',
};

export default withStyles(styles, { name: 'A' })(A);
