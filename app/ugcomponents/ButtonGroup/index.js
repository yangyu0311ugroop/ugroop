import ButtonGroup from '@material-ui/core/ButtonGroup';
import React from 'react';
import PropTypes from 'prop-types';

export const UGButtonGroup = ({
  variant,
  color,
  classes,
  disabled,
  disableFocusRipple,
  fullWidth,
  size,
  children,
}) => (
  <ButtonGroup
    fullWidth={fullWidth}
    disabled={disabled}
    disableFocusRipple={disableFocusRipple}
    size={size}
    classes={classes}
    color={color}
    variant={variant}
  >
    {children}
  </ButtonGroup>
);

UGButtonGroup.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
  color: PropTypes.string,
  classes: PropTypes.bool,
  disabled: PropTypes.bool,
  disableFocusRipple: PropTypes.bool,
  fullWidth: PropTypes.bool,
  size: PropTypes.func,
};

// eslint-disable-next-line react/no-multi-comp
export default UGButtonGroup;
