import React from 'react';
import MuiStepper from '@material-ui/core/Stepper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import style from './style';
export const Stepper = props => {
  const { ...rest } = props;
  return <MuiStepper {...rest}>{props.children}</MuiStepper>;
};

Stepper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withStyles(style, { name: 'Stepper' })(Stepper);
