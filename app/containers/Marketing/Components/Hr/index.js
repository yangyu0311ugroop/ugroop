import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import stylesheet from './style';

export const UGHr = ({ classes, size, className }) => {
  let inlineStyle = {};
  if (size) {
    inlineStyle = {
      width: `${size.value}${size.unit}`,
    };
  }
  return (
    <hr style={inlineStyle} className={classNames(classes.root, className)} />
  );
};

UGHr.propTypes = {
  classes: PropTypes.object,
  size: PropTypes.object,
  className: PropTypes.string,
};
UGHr.defaultProps = {};

export default withStyles(stylesheet, { name: 'UGHr' })(UGHr);
