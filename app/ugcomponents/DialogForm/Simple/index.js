/**
 * Created by stephenkarpinskyj on 16/3/18.
 */

import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import withForm from 'utils/hoc/formsy/withForm';
import Dialog from 'ugcomponents/Dialog';

const stylesheet = {
  children: {
    padding: '24px 24px 0px',
  },
};

/**
 * Intended for dialog forms with a small number of fields.
 */
export class SimpleDialogForm extends PureComponent {
  render = () => {
    const {
      classes,
      children,
      canSubmitForm,
      submitForm,
      cancelForm,
      onClose,
      open,
      dialogProps,
      ugDialogProps,
    } = this.props;
    const childrenContent = <div className={classes.children}>{children}</div>;
    return (
      <Dialog
        open={open}
        muiDialogProps={{
          onClose,
          ...dialogProps,
        }}
        disabled={!canSubmitForm}
        customChildren={{ content: childrenContent }}
        confirmFunc={submitForm}
        cancelFunc={cancelForm(false)}
        {...ugDialogProps}
      />
    );
  };
}

SimpleDialogForm.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  canSubmitForm: PropTypes.bool.isRequired,
  submitForm: PropTypes.func.isRequired,
  cancelForm: PropTypes.func.isRequired,

  // parent
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  dialogProps: PropTypes.object,
  ugDialogProps: PropTypes.object,
};

SimpleDialogForm.defaultProps = {
  dialogProps: {},
  ugDialogProps: { template: 'delete' },
};

export default compose(
  withStyles(stylesheet, { name: 'SimpleDialogForm' }),
  withForm(),
)(SimpleDialogForm);
