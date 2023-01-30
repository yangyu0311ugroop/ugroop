/**
 * Created by stephenkarpinskyj on 16/3/18.
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Dialog from 'ugcomponents/Dialog';

export class DiscardConfirmationDialog extends PureComponent {
  render = () => {
    const { open, onConfirm, onCancel, customClassnames } = this.props;

    return (
      <Dialog
        open={open}
        template="delete"
        dialogTitle="Discard Changes"
        cancelButton="Cancel"
        confirmButton="Go ahead and discard"
        headlineIcon="lnr-bubble-alert"
        headlineTitle="You are leaving without saving"
        headlineText="You have unsaved changes. Are you sure you want to discard?"
        confirmFunc={onConfirm}
        cancelFunc={onCancel}
        customClassnames={customClassnames}
      />
    );
  };
}

DiscardConfirmationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  customClassnames: PropTypes.object,
};

export default DiscardConfirmationDialog;
