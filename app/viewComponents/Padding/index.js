import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { convertStyleClass } from 'utils/style-utils';
import styles from './styles';

export const Padding = ({
  classes,
  children,
  top,
  bottom,
  left,
  right,
  fullWidth,
  className,
}) => (
  <div
    className={classnames(
      { [classes.root]: fullWidth },
      convertStyleClass(classes, `paddingTop${top.toUpperCase()}`),
      convertStyleClass(classes, `paddingBottom${bottom.toUpperCase()}`),
      convertStyleClass(classes, `paddingLeft${left.toUpperCase()}`),
      convertStyleClass(classes, `paddingRight${right.toUpperCase()}`),
      className,
    )}
  >
    {children}
  </div>
);

Padding.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  fullWidth: PropTypes.bool,

  top: PropTypes.oneOf(['', 'sm', 'md', 'lg', 'xl', 'xxl']),
  bottom: PropTypes.oneOf(['', 'sm', 'md', 'lg', 'xl', 'xxl']),
  left: PropTypes.oneOf(['', 'sm', 'md', 'lg', 'xl', 'xxl']),
  right: PropTypes.oneOf(['', 'sm', 'md', 'lg', 'xl', 'xxl']),
  className: PropTypes.string,
};

Padding.defaultProps = {
  fullWidth: false,
  children: '',
  top: '',
  bottom: '',
  left: '',
  right: '',
  className: '',
};

export default withStyles(styles, { name: 'Padding' })(Padding);
