import React from 'react';
import PropTypes from 'prop-types';
import { DialogContentText } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import stylesheet from './styles';

export const UGDialogText = ({ children, ...props }) => (
  <DialogContentText {...props}>{children}</DialogContentText>
);

UGDialogText.propTypes = {
  children: PropTypes.node,
};

export default withStyles(stylesheet)(UGDialogText);
