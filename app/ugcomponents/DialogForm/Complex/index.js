/**
 * Created by stephenkarpinskyj on 16/3/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { SIZE_CONSTANTS } from 'sizeConstants';

import withForm from 'utils/hoc/formsy/withForm';
import GridItem from 'components/GridItem';
import Dialog from 'components/Dialog';
import DialogTitle from 'components/Dialog/UGDialogTitle';
import DialogContent from 'components/Dialog/UGDialogContent';
import DialogActions from 'components/Dialog/UGDialogAction';
import classnames from 'classnames';
import { convertStyleClass } from 'utils/style-utils';
import CloseButton from './components/CloseButton';
import stylesheet from './styles';

export Title from './components/Title';
export TitleHeading from './components/TitleHeading';
export Section from './components/Section';
export CloseButton from './components/CloseButton';

/**
 * Intended for large dialog forms focused on data entry.
 */
export class ComplexDialogForm extends React.PureComponent {
  getDialogProps = () => {
    if (!this.dialogProps) {
      this.dialogProps = {
        fullWidth: this.props.fullWidth,
        maxWidth: this.props.maxWidth,
        PaperProps: this.getPaperProps(),
        ...this.props.dialogProps,
      };
    }
    return this.dialogProps;
  };

  getPaperProps = () => {
    if (!this.paperProps) {
      this.paperProps = {
        classes: {
          root: classnames(
            this.props.classes.paper,
            convertStyleClass(this.props.classes, `${this.props.size}Size`),
          ),
        },
        'data-testid': 'dialog-form-paper',
        component: this.renderForm,
        ...this.props.PaperProps,
      };
    }
    return this.paperProps;
  };

  getTitleClasses = () => {
    if (!this.TitleClasses) {
      const { classes } = this.props;
      this.TitleClasses = { root: classes.titleRoot };
    }
    return this.TitleClasses;
  };

  getActionsClasses = () => {
    if (!this.ActionsClasses) {
      const { classes } = this.props;
      this.ActionsClasses = { root: classes.actionsRoot };
    }
    return this.ActionsClasses;
  };

  renderForm = props => this.props.renderForm(props);

  renderHeader = args => {
    const { isFormChanged, isFormDisabled, renderHeader } = this.props;
    const { onClose } = args;

    const renderCloseButton = (buttonProps = {}) => {
      if (isFormChanged && !isFormDisabled) {
        return null;
      }
      return (
        <CloseButton
          data-testid="dialog-form-close-btn"
          onClick={onClose}
          {...buttonProps}
        />
      );
    };

    if (renderHeader) {
      return renderHeader({ ...args, renderCloseButton });
    }

    return <DialogActions>{renderCloseButton()}</DialogActions>;
  };

  renderActions = children => (
    <DialogActions classes={this.getActionsClasses()}>{children}</DialogActions>
  );

  renderFooter = args => {
    const { renderFooter } = this.props;
    const { renderActions, renderSubmitButton, renderCancelButton } = args;

    if (renderFooter) {
      return renderFooter(args);
    }

    return renderActions([
      <GridItem key="cancel">{renderCancelButton()}</GridItem>,
      <GridItem key="submit">{renderSubmitButton()}</GridItem>,
    ]);
  };

  renderChildren = () => {
    const {
      isFormChanged,
      canSubmitForm,
      submitForm,
      cancelForm,
      resetForm,
      renderSubmitButton,
      renderCancelButton,
      children,
      onClose,
    } = this.props;
    const { renderActions } = this;
    return (
      <React.Fragment>
        <DialogTitle classes={this.getTitleClasses()}>
          {this.renderHeader({
            onClose,
            isFormChanged,
          })}
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
        {this.renderFooter({
          isFormChanged,
          canSubmitForm,
          submitForm,
          cancelForm,
          resetForm,
          renderActions,
          renderSubmitButton,
          renderCancelButton,
        })}
      </React.Fragment>
    );
  };

  render = () => (
    <Dialog open={this.props.open} {...this.getDialogProps()}>
      {this.renderChildren()}
    </Dialog>
  );
}

ComplexDialogForm.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  renderForm: PropTypes.func.isRequired,
  isFormChanged: PropTypes.bool.isRequired,
  isFormDisabled: PropTypes.bool.isRequired,
  canSubmitForm: PropTypes.bool.isRequired,
  submitForm: PropTypes.func.isRequired,
  cancelForm: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  renderSubmitButton: PropTypes.func.isRequired,
  renderCancelButton: PropTypes.func.isRequired,

  // parent
  children: PropTypes.node,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  dialogProps: PropTypes.object,
  renderHeader: PropTypes.func,
  renderFooter: PropTypes.func,
  PaperProps: PropTypes.object,
  maxWidth: PropTypes.any,
  fullWidth: PropTypes.bool,
  size: PropTypes.string,
};

ComplexDialogForm.defaultProps = {
  dialogProps: {},
  renderHeader: null,
  renderFooter: null,
  PaperProps: {},
  maxWidth: false,
  fullWidth: true,
  size: SIZE_CONSTANTS.MD,
};

export default compose(
  withStyles(stylesheet, { name: 'ComplexDialogForm' }),
  withForm({ manualRenderForm: true }),
)(ComplexDialogForm);
