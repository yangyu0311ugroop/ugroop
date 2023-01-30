/**
 * Created by quando on 3/3/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

function withValidation(WrappedComponent) {
  class PP extends React.Component {
    componentWillMount = () => {
      this.setValue(this.props.value);
    };

    componentDidUpdate = prevProps => {
      if (prevProps.value !== this.props.value) {
        this.value = this.props.value;
      }
      if (this.props.getValue() !== this.value) {
        this.value = this.props.getValue();
      }
    };

    /**
     * Gets right value to pass to wrapped component.
     */
    getValue = () => {
      const { isValidValue, getValue, onInterceptGetValue } = this.props;
      return onInterceptGetValue(
        isValidValue(this.value) ? getValue() : this.value,
      );
    };

    /**
     * set the state value and update the value of inputHOC
     */
    setValue = value => {
      const { setValue, onInterceptSetValue } = this.props;
      this.value = value;
      if (setValue) setValue(onInterceptSetValue(value));
    };

    /**
     * updates values after debounce finishes + calls onChange
     * @param value
     */
    handleChangeValue = value => {
      const { setValue, onChange, onInterceptSetValue } = this.props;
      if (setValue) setValue(onInterceptSetValue(value));
      if (onChange) onChange(value);
    };

    /**
     * update values on blur and call parent function if passed in
     */
    handleBlur = ({ target: { value } }) => {
      this.setValue(value);
      if (this.changeValue) this.changeValue.cancel();
      if (this.props.onBlur) this.props.onBlur(value);
      this.forceUpdate();
    };

    /**
     * add a small debounce time that errors won't
     * pop when user is still writing
     */
    handleChange = ({ target: { value } }) => {
      const { isValidValue, debounceMs, onChange } = this.props;

      if (!isValidValue(value) && value.length && debounceMs) {
        this.value = value;
        if (!this.changeValue) {
          this.changeValue = debounce(this.handleChangeValue, debounceMs);
        }
        this.changeValue(value);
      } else {
        this.setValue(value);
        if (this.changeValue) this.changeValue.cancel();
        if (onChange) onChange(this.value);
      }
      this.forceUpdate();
    };

    helperOrValid = (
      isValid,
      hasValue,
      isPristine,
      validText,
      helperText,
      errorText,
    ) =>
      (isValid() || !hasValue()) && !isPristine()
        ? validText || helperText
        : errorText || helperText;

    isDisabled = () => this.props.isFormDisabled() || this.props.disabled;

    render() {
      const {
        /* removed uneccessary props from inputHOC */
        defaultValue,
        debounceMs,
        isRequired,
        isFormSubmitted,
        validations,
        validationErrors,
        setValue,
        isFormDisabled,
        showError,
        isValidValue,
        setValidations, // eslint-disable-line no-unused-vars, react/prop-types
        resetValue, // eslint-disable-line no-unused-vars, react/prop-types
        hasValue, // eslint-disable-line no-unused-vars, react/prop-types
        getErrorMessages, // eslint-disable-line no-unused-vars, react/prop-types
        showRequired, // eslint-disable-line no-unused-vars, react/prop-types
        validationError, // eslint-disable-line no-unused-vars, react/prop-types
        helperText,
        validText,
        getErrorMessage,
        isValid,
        isPristine,
        getValue,
        disabled,
        onInterceptGetValue,
        onInterceptSetValue,
        ...props
      } = this.props;
      const errorText = getErrorMessage();
      const error =
        hasValue() &&
        (typeof errorText === 'string' ||
          (typeof errorText === 'object' && !!errorText));
      const helperOrValid = this.helperOrValid(
        isValid,
        hasValue,
        isPristine,
        validText,
        helperText,
        errorText,
      );
      return (
        <WrappedComponent
          {...props}
          helperText={helperOrValid}
          error={error}
          value={this.getValue()}
          isValid={isValid}
          disabled={this.isDisabled()}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
        />
      );
    }
  }
  PP.propTypes = {
    name: PropTypes.string,
    helperText: PropTypes.node,
    validText: PropTypes.node,
    state: PropTypes.oneOf(['success', 'warning', 'error', null]),
    requiredError: PropTypes.string,
    helper: PropTypes.any,
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    validations: PropTypes.any,
    validationErrors: PropTypes.any,
    isRequired: PropTypes.func,
    isValid: PropTypes.func,
    isPristine: PropTypes.func,
    setValue: PropTypes.func,
    getValue: PropTypes.func,
    isFormDisabled: PropTypes.func,
    isFormSubmitted: PropTypes.func,
    getErrorMessage: PropTypes.func,
    showError: PropTypes.func,
    isValidValue: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    debounceMs: PropTypes.number,
    disabled: PropTypes.bool,
    onInterceptGetValue: PropTypes.func,
    onInterceptSetValue: PropTypes.func,
  };
  PP.defaultProps = {
    debounceMs: 500,
    getErrorMessage: () => '',
    isPristine: () => true,
    isRequired: () => false,
    isFormDisabled: () => false,
    isFormSubmitted: () => false,
    showError: () => '',
    isValidValue: () => true,
    disabled: false,
    onInterceptGetValue: value => value || '',
    onInterceptSetValue: value => value,
  };
  return PP;
}

export default withValidation;
