import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Dialog from 'components/Dialog';
import DialogTitle from 'components/Dialog/UGDialogTitle';
import DialogAction from 'components/Dialog/UGDialogAction';
import DialogContent from 'components/Dialog/UGDialogContent';
import { withStyles } from '@material-ui/core/styles';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import {
  DialogTitleContent,
  HeadlineContent,
} from './components/DialogChildren';
import DialogActions from './components/DialogActions';
import styles from './styles';

export class UGDialog extends PureComponent {
  generateDialogActions = () => {
    const {
      button,
      disabled,
      loading,
      template,
      confirmButton,
      cancelButton,
      confirmFunc,
      cancelFunc,
      type,
      confirmButtonNode,
      disableConfirmButton,
      customClassnames,
      logoutOnConfirm,
      simplifyDialog,
      confirmation,
    } = this.props;

    if (button === 0) {
      return null;
    }

    const {
      actionContainer: actionContainerClass,
      confirmButton: confirmButtonClass,
      cancelButton: cancelButtonClass,
    } = customClassnames;

    return (
      <DialogActions
        button={button}
        type={type}
        template={template}
        disabled={disabled}
        confirmFunc={confirmFunc}
        loading={loading}
        cancelFunc={cancelFunc}
        confirmButton={confirmButton}
        cancelButton={cancelButton}
        confirmButtonNode={confirmButtonNode}
        disableConfirmButton={disableConfirmButton}
        confirmButtonClassName={confirmButtonClass}
        cancelButtonClassName={cancelButtonClass}
        actionContainerClassName={actionContainerClass}
        logoutOnConfirm={logoutOnConfirm}
        simplifyDialog={simplifyDialog}
        confirmation={confirmation}
      />
    );
  };

  generateDialog = () => {
    const {
      classes,
      type,
      template,
      headlineTitle,
      headlineIcon,
      headlineText,
      cancelFunc,
      onCloseFunc,
      dialogTitle,
      customClassnames,
      customChildren,
      hideHeadline,
      simplifyDialog,
    } = this.props;

    const {
      title: titleClass,
      content: contentClass,
      action: actionClass,
      headline: headlineClass,
    } = customClassnames;

    const {
      title: titleChild,
      content: contentChild,
      action: actionChild,
      footer: dialogFooter,
    } = customChildren;

    const headline = hideHeadline ? (
      ''
    ) : (
      <HeadlineContent
        type={type}
        template={template}
        headlineIcon={headlineIcon}
        headlineTitle={headlineTitle}
        headlineText={headlineText}
        headlineClass={headlineClass}
        hideIcon={simplifyDialog}
        hideTitle={simplifyDialog}
        simplifyDialog={simplifyDialog}
      />
    );

    const defaultOnClose = onCloseFunc || cancelFunc;

    const defaultTitle = (
      <DialogTitleContent
        onClose={defaultOnClose}
        type={type}
        template={template}
        dialogTitle={dialogTitle}
      />
    );
    const children = (
      <React.Fragment>
        <DialogTitle className={classnames(titleClass, classes.titleClass)}>
          {titleChild || defaultTitle}
        </DialogTitle>
        <DialogContent
          className={classnames(
            contentClass,
            classes.contentClass,
            LOGIC_HELPERS.ifElse(simplifyDialog, classes.simplifyDialog),
          )}
        >
          {headline}
          {contentChild}
        </DialogContent>
        <DialogAction className={classnames(actionClass, classes.actionClass)}>
          {actionChild || this.generateDialogActions()}
        </DialogAction>
        {dialogFooter}
      </React.Fragment>
    );
    return this.dialogWrapper(children);
  };

  dialogWrapper = children => {
    const {
      classes,
      customClassnames,
      onCloseFunc,
      cancelFunc,
      muiDialogProps,
      open,
    } = this.props;
    const onClose = onCloseFunc || cancelFunc;

    return (
      <Dialog
        open={open}
        onClose={onClose}
        classes={{
          paper: classnames(classes.paper, customClassnames.dialog),
        }}
        {...muiDialogProps}
      >
        {children}
      </Dialog>
    );
  };

  render() {
    const { customChildren } = this.props;
    if (customChildren.dialog) {
      return this.dialogWrapper(customChildren.dialog);
    }
    return this.generateDialog();
  }
}

UGDialog.propTypes = {
  open: PropTypes.bool,
  template: PropTypes.string,
  type: PropTypes.string,
  button: PropTypes.number,

  dialogTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

  headlineIcon: PropTypes.string,

  headlineText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  headlineTitle: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),

  confirmButton: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  cancelButton: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

  confirmButtonNode: PropTypes.node,

  confirmFunc: PropTypes.func,
  cancelFunc: PropTypes.func,
  onCloseFunc: PropTypes.func,
  disabled: PropTypes.bool,
  muiDialogProps: PropTypes.object,
  customClassnames: PropTypes.object,
  customChildren: PropTypes.object,
  classes: PropTypes.object.isRequired,
  disableConfirmButton: PropTypes.bool,
  hideHeadline: PropTypes.bool,
  logoutOnConfirm: PropTypes.bool,
  simplifyDialog: PropTypes.bool,
  loading: PropTypes.bool,
  confirmation: PropTypes.bool,
};

UGDialog.defaultProps = {
  button: 2,
  disabled: false,
  template: 'custom',
  confirmButton: 'Confirm',
  cancelButton: 'Cancel',
  customChildren: {},
  customClassnames: {},
  muiDialogProps: {},
  disableConfirmButton: false,
  logoutOnConfirm: false,
  hideHeadline: false,
};

export default withStyles(styles, { name: 'UGDialog' })(UGDialog);
