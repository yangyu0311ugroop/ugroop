import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import DialogFlow from './renderer';

export class DialogFlowContainer extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    isOpen: PropTypes.bool,
    isFullWidth: PropTypes.bool,
    actionBtnSize: PropTypes.string,
    isManuallyControlled: PropTypes.bool,
    isDiscardBtnHidden: PropTypes.bool,
    isXBtnHidden: PropTypes.bool,
    // eslint-disable-next-line react/no-unused-prop-types
    inputToBeValidated: PropTypes.object,
    onHookSingleValidation: PropTypes.func,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func,
    saveText: PropTypes.node,
    isSaveDisabled: PropTypes.bool,
    isBeingDiscarded: PropTypes.bool,
    onFormValid: PropTypes.func,
    onFormSubmit: PropTypes.func,
    onFormInvalid: PropTypes.func,
    onValidated: PropTypes.func,
    checkAllInput: PropTypes.bool,
    dialogClassName: PropTypes.string,
    customValidator: PropTypes.func,
  };

  static defaultProps = {
    children: '',
    isOpen: false,
    isFullWidth: false,
    actionBtnSize: 'small',
    isManuallyControlled: false,
    isDiscardBtnHidden: true,
    isXBtnHidden: false,
    inputToBeValidated: {},
    onHookSingleValidation: null,
    isSaveDisabled: false,
    isBeingDiscarded: false,
    saveText: undefined,
    onFormValid: undefined,
    onFormSubmit: undefined,
    onFormInvalid: undefined,
    onSave: undefined,
    checkAllInput: true,
    dialogClassName: '',
    customValidator: null,
    onValidated: null,
  };

  state = {
    isXBtnHidden: false,
    isDiscardBtnHidden: true,
    isBeingDiscarded: false,
  };

  componentWillReceiveProps = nextProps => {
    if (!nextProps.isManuallyControlled) {
      this.checkIfDiscardButtonToBeHidden(nextProps.inputToBeValidated);
    }
  };

  onDiscardBtnClick = () => {
    // Open the prompt modal
    this.setState({
      isBeingDiscarded: true,
    });
  };

  onToBeDiscarded = () => {
    if (this.props.isManuallyControlled) {
      // If things are handled manually, just call
      // onClose function
      this.props.onClose();
    } else {
      // If things are not handled manually, reset the state
      // and call the onClose function
      this.setState({
        isBeingDiscarded: false,
        isDiscardBtnHidden: true,
        isXBtnHidden: false,
      });
      this.props.onClose();
    }
  };

  onNotToBeDiscarded = () => {
    // Set the state for prompt modal to false
    this.setState({
      isBeingDiscarded: false,
    });
  };

  validateInput = (input, keyName) => {
    let flag = true;
    if (input === null || input === '') {
      return !flag;
    }
    if (this.props.onHookSingleValidation) {
      flag = this.props.onHookSingleValidation(input, keyName, flag);
    }
    return flag;
  };

  acceptAtleastOneValid = input => {
    let flag = false;
    // I'm just doing one level deep validation of input
    const oKeys = Object.keys(input);
    for (let i = 0; i < oKeys.length; i += 1) {
      if (this.validateInput(input[oKeys[i]], oKeys[i])) {
        flag = true;
        break;
      }
      flag = false;
    }

    return flag;
  };

  acceptOnceAllIsValid = input => {
    let flag = false;
    // I'm just doing one level deep validation of input
    const oKeys = Object.keys(input);
    for (let i = 0; i < oKeys.length; i += 1) {
      // If just one input is invalid, return false immediately
      if (!this.validateInput(input[oKeys[i]])) {
        flag = false;
        break;
      }
      flag = true;
    }

    return flag;
  };

  checkIfDiscardButtonToBeHidden = inputToBeValidated => {
    let flag;
    // I'm just doing one level deep validation of input
    if (this.props.customValidator) {
      // If customValidator exist (meaning user have its custom validator)
      // use it instead of the two baked in validator
      flag = this.props.customValidator(inputToBeValidated);
    } else if (this.props.checkAllInput) {
      // All inputs should be valid or exist
      flag = this.acceptOnceAllIsValid(inputToBeValidated);
    } else {
      // At least one input is valid or exist
      flag = this.acceptAtleastOneValid(inputToBeValidated);
    }

    // In case the user is interested in the validation result
    // the user can just pass this props to know the result
    if (this.props.onValidated) {
      this.props.onValidated(flag);
    }

    if (flag) {
      // if it is true, this means that modal input field have value
      // which means discard button should not be hidden
      // and x button should be hidden
      this.setState({
        isDiscardBtnHidden: false,
        isXBtnHidden: true,
      });
    } else {
      // if it is false, this means that modal input field don't have value
      // which means discard button should be hidden
      // and x button should be displayed
      this.setState({
        isDiscardBtnHidden: true,
        isXBtnHidden: false,
      });
    }
  };

  render = () => {
    const {
      isOpen,
      isFullWidth,
      children,
      actionBtnSize,
      isManuallyControlled,
      onClose,
      onSave,
      saveText,
      isSaveDisabled,
      isBeingDiscarded,
      onFormValid,
      onFormSubmit,
      onFormInvalid,
      dialogClassName,
    } = this.props;
    const { isDiscardBtnHidden, isXBtnHidden } = this.state;

    let openPrompt = this.state.isBeingDiscarded;
    let discardBtnState = isDiscardBtnHidden;
    let xBtnState = isXBtnHidden;
    if (isManuallyControlled) {
      discardBtnState = this.props.isDiscardBtnHidden;
      xBtnState = this.props.isXBtnHidden;
      openPrompt = isBeingDiscarded;
    }

    return (
      <DialogFlow
        isXBtnHidden={xBtnState}
        isDiscardBtnHidden={discardBtnState}
        actionBtnSize={actionBtnSize}
        isOpen={isOpen}
        isFullWidth={isFullWidth}
        onClose={onClose}
        onSave={onSave}
        saveText={saveText}
        onDiscardClick={this.onDiscardBtnClick}
        onCloseClick={this.onToBeDiscarded}
        onCancelClick={this.onNotToBeDiscarded}
        isSaveDisabled={isSaveDisabled}
        isBeingDiscarded={openPrompt}
        dialogClassName={dialogClassName}
        onValidSubmit={onFormSubmit}
        onValid={onFormValid}
        onInvalid={onFormInvalid}
      >
        {children}
      </DialogFlow>
    );
  };
}

export default DialogFlowContainer;
