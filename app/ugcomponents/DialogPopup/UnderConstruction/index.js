/**
 * Created by stephenkarpinskyj on 16/3/18.
 */

import React from 'react';
import PropTypes from 'prop-types';

import Dialog from 'ugcomponents/Dialog';

export const UnderConstructionDialog = ({
  open,
  onClose,
  customClassnames,
}) => (
  <Dialog
    button={1}
    template="custom"
    dialogTitle="COMING SOON"
    headlineIcon="lnr-construction"
    headlineTitle="This feature is under construction"
    headlineText="We're currently working on this but feel free to contact us if you can't wait."
    confirmButton="Go back"
    confirmFunc={onClose}
    cancelFunc={onClose}
    open={open}
    customClassnames={customClassnames}
  />
);

UnderConstructionDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  customClassnames: PropTypes.object,
};

export default UnderConstructionDialog;
