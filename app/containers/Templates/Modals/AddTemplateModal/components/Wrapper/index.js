import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DialogFlow from 'ugcomponents/DialogFlow';
import stylesheet from './styles';

export const AddTemplateDialogFlow = ({ classes, children, ...props }) => (
  <DialogFlow dialogClassName={classes.root} {...props}>
    {children}
  </DialogFlow>
);

AddTemplateDialogFlow.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};
AddTemplateDialogFlow.defaultProps = {};

export default withStyles(stylesheet, { name: 'AddTemplateDialogFlow' })(
  AddTemplateDialogFlow,
);
