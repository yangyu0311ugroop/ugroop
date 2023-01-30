/**
 * Created by stephenkarpinskyj on 17/4/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import { DiscardConfirmationDialog } from 'ugcomponents/DialogPopup';
import Button from 'viewComponents/Button';
import { VARIANTS } from 'variantsConstants';
import { Prompt } from 'react-router-dom';
import { FormContext } from './FormContext';

/**
 * Formsy HOC for forms with new props for convenience.
 */
const withForm = ({ manualRenderForm = false } = {}) => WrappedComponent => {
  class GenericForm extends React.PureComponent {
    static makeInitialState = () => ({
      isFormChanged: false,
      discarding: false,
    });

    state = GenericForm.makeInitialState();

    getFormContext = () => {
      if (!this.formContext) {
        this.formContext = {
          isFormDisabled: this.isFormDisabled,
        };
      }

      return this.formContext;
    };

    getOptionalProps = () => {
      const props = {};

      if (manualRenderForm) {
        props.renderForm = this.renderFormWithContextProvider;
      }

      return props;
    };

    isFormDisabled = () => this.props.disabled;

    canSubmitForm = () => this.props.canSubmitForm;

    submitForm = () => {
      this.form.submit();
    };

    cancelForm = (confirm = true) => () => {
      if (confirm) {
        this.setState({ discarding: true });
      } else {
        this.handleConfirmDiscard();
      }
    };

    resetForm = (values = {}, spreadCurrentValuesFirst = false) => {
      if (spreadCurrentValuesFirst) {
        this.form.reset({ ...this.currentValues, ...values });
      } else {
        this.form.reset(values);
      }
    };

    handleRef = ref => {
      this.form = ref;

      if (this.form) {
        this.currentValues = this.form.getCurrentValues();
        this.setState(GenericForm.makeInitialState());
      }
    };

    handleChange = (currentValues, isChanged) => {
      const { onFormChange } = this.props;

      this.previousValues = { ...this.currentValues };
      this.currentValues = currentValues;

      if (onFormChange) {
        const args = {
          previousValues: this.previousValues,
          currentValues: this.currentValues,
          isChanged,
          resetForm: this.form.reset,
          invalidateForm: this.form.updateInputsWithError,
        };
        onFormChange(args);
      }

      this.setState({ isFormChanged: isChanged });
    };

    handleValidSubmit = (model, resetForm, invalidateForm) => {
      const { onFormValidSubmit } = this.props;

      if (onFormValidSubmit) {
        const args = {
          model,
          resetForm,
          invalidateForm,
          isChanged: this.state.isFormChanged,
          isDisabled: this.isFormDisabled(),
        };
        onFormValidSubmit(args);
      }
    };

    handleConfirmDiscard = () => {
      const { onCancel } = this.props;
      this.setState({ discarding: false });
      if (onCancel) onCancel();
    };

    handleCancelDiscard = () => {
      this.setState({ discarding: false });
    };

    handleBeforeUnload = () => true;

    renderSubmitButton = (props = {}) => {
      const { loading } = this.props;
      const buttonProps = {
        type: 'submit',
        disabled: !this.isFormDisabled() && !this.canSubmitForm(),
        color: 'primary',
        noMargin: true,
        dense: true,
        loading,
        ...props,
      };
      return <Button {...buttonProps}>{this.props.submitButtonContent}</Button>;
    };

    renderCancelButton = (props = {}, confirm = true) => {
      const { loading } = this.props;
      if (this.isFormDisabled() || !this.state.isFormChanged) {
        return null;
      }
      const buttonProps = {
        type: 'button',
        onClick: this.cancelForm(confirm),
        color: 'black',
        variant: VARIANTS.OUTLINE,
        noMargin: true,
        dense: true,
        disabled: loading,
        ...props,
      };
      return <Button {...buttonProps}>{this.props.cancelButtonContent}</Button>;
    };

    renderParent = children =>
      manualRenderForm
        ? children
        : this.renderFormWithContextProvider({ children });

    renderFormWithContextProvider = props => (
      <FormContext.Provider value={this.getFormContext()}>
        {this.renderForm(props)}
      </FormContext.Provider>
    );

    renderForm = props => {
      const {
        mapping,
        validationErrors,
        onSubmit,
        onValid,
        onInvalid,
        onValidSubmit,
        onInvalidSubmit,
        onChange,
        reset,
        preventExternalInvalidation,
        disabled,
      } = this.props;
      return (
        <Formsy
          ref={this.handleRef}
          mapping={mapping}
          validationErrors={validationErrors}
          onSubmit={onSubmit}
          onValid={onValid}
          onInvalid={onInvalid}
          onValidSubmit={(model, resetForm, invalidateForm) => {
            this.handleValidSubmit(model, resetForm, invalidateForm);
            if (onValidSubmit) onValidSubmit(model, resetForm, invalidateForm);
          }}
          onInvalidSubmit={onInvalidSubmit}
          onChange={(currentValues, isChanged) => {
            this.handleChange(currentValues, isChanged);
            if (onChange) onChange(currentValues, isChanged);
          }}
          reset={reset}
          preventExternalInvalidation={preventExternalInvalidation}
          disabled={disabled}
          {...props}
        />
      );
    };

    renderWrapped = () => {
      const {
        mapping,
        validationErrors,
        onSubmit,
        onValid,
        onInvalid,
        onValidSubmit,
        onInvalidSubmit,
        onChange,
        reset,
        preventExternalInvalidation,
        disabled,

        canSubmitForm,
        discardDialogProps,
        showChangeRoutePrompt,
        ...props
      } = this.props;
      const { isFormChanged } = this.state;

      let prompt = null;
      if (showChangeRoutePrompt) {
        window.onbeforeunload = this.handleBeforeUnload;
        prompt = (
          <Prompt
            when={isFormChanged}
            message="Leaving the page? Changes you made may not be saved"
          />
        );
      } else {
        window.onbeforeunload = null;
      }

      return this.renderParent(
        <>
          <WrappedComponent
            isFormChanged={isFormChanged}
            isFormDisabled={disabled}
            canSubmitForm={this.canSubmitForm()}
            submitForm={this.submitForm}
            cancelForm={this.cancelForm}
            resetForm={this.resetForm}
            renderSubmitButton={this.renderSubmitButton}
            renderCancelButton={this.renderCancelButton}
            {...this.getOptionalProps()}
            {...props}
          />
          {prompt}
        </>,
      );
    };

    renderDiscardConfirmationDialog = () => {
      const { discardDialogProps } = this.props;
      const { discarding } = this.state;
      return (
        <DiscardConfirmationDialog
          open={discarding}
          onConfirm={this.handleConfirmDiscard}
          onCancel={this.handleCancelDiscard}
          {...discardDialogProps}
        />
      );
    };

    render = () => (
      <React.Fragment>
        {this.renderWrapped()}
        {this.renderDiscardConfirmationDialog()}
      </React.Fragment>
    );
  }

  GenericForm.propTypes = {
    // parent (for formsy)
    mapping: PropTypes.func,
    validationErrors: PropTypes.object,
    onSubmit: PropTypes.func,
    onValid: PropTypes.func,
    onInvalid: PropTypes.func,
    onValidSubmit: PropTypes.func,
    onInvalidSubmit: PropTypes.func,
    onChange: PropTypes.func,
    reset: PropTypes.func,
    preventExternalInvalidation: PropTypes.func,
    disabled: PropTypes.bool,
    showChangeRoutePrompt: PropTypes.bool,

    // parent (for wrapped)
    onCancel: PropTypes.func,
    onFormChange: PropTypes.func,
    onFormValidSubmit: PropTypes.func,
    submitButtonContent: PropTypes.any,
    cancelButtonContent: PropTypes.any,

    // parent (for withForm)
    canSubmitForm: PropTypes.bool,
    confirmDiscard: PropTypes.bool,
    discardDialogProps: PropTypes.object,
    loading: PropTypes.bool,
  };

  GenericForm.defaultProps = {
    onValid: () => {},
    onInvalid: () => {},
    disabled: false,

    submitButtonContent: 'Submit',
    cancelButtonContent: 'Discard',

    canSubmitForm: true,
    discardDialogProps: {},
    loading: false,
    showChangeRoutePrompt: false,
  };

  return GenericForm;
};

export default withForm;
