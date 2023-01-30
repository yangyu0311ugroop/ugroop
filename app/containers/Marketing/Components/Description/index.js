import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import stylesheet from './style';

export const Description = ({ classes, children, isBold, size, className }) => {
  const inlineStyle = {
    fontSize: `${size}px`,
  };
  const cls = classNames(classes.root, className);
  if (isBold) {
    return (
      <p style={inlineStyle} className={cls}>
        <strong>{children}</strong>
      </p>
    );
  }
  return (
    <p style={inlineStyle} className={cls}>
      {children}
    </p>
  );
};

Description.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
  isBold: PropTypes.bool,
  size: PropTypes.number,
  className: PropTypes.string,
};
Description.defaultProps = {
  size: 11,
};

export default withStyles(stylesheet, { name: 'Description' })(Description);
