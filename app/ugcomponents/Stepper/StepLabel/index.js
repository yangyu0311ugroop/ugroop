import React from 'react';
import MuiStepLabel from '@material-ui/core/StepLabel';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import style from './style';
export const StepLabel = props => {
  const { ...rest } = props;
  return <MuiStepLabel {...rest}>{props.children}</MuiStepLabel>;
};

StepLabel.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withStyles(style, { name: 'StepLabel' })(StepLabel);
