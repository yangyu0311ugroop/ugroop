import React from 'react';
import PropTypes from 'prop-types';
import HelpDialogUI from './ui';

export const HelpDialog = ({
  open,
  onClose,
  dialogTitle,
  children,
  className,
}) => (
  <HelpDialogUI
    open={open}
    onClose={onClose}
    dialogTitle={dialogTitle}
    className={className}
  >
    {children}
  </HelpDialogUI>
);

HelpDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  dialogTitle: PropTypes.string.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

HelpDialog.defaultProps = {
  open: false,
  children: [],
  className: '',
};

export default HelpDialog;
