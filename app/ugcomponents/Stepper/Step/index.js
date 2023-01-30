import React from 'react';
import MuiStep from '@material-ui/core/Step';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import style from './style';
export const Step = props => {
  const { ...rest } = props;
  return <MuiStep {...rest}>{props.children}</MuiStep>;
};

Step.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withStyles(style, { name: 'Step' })(Step);
