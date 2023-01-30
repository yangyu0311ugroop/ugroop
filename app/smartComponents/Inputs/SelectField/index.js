/**
 * Created by stephenkarpinskyj on 30/9/18.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withFormsy } from 'formsy-react';
import Select from 'viewComponents/Inputs/SelectField';

export class SelectField extends Component {
  getValue = () => {
    const { currentValue, getValue } = this.props;
    if (currentValue !== undefined) return currentValue;
    return getValue();
  };

  handleChange = ({ target: { value } }) => {
    const { setValue, onChange } = this.props;
    setValue(value);
    onChange(value);
  };

  render = () => {
    const {
      isRequired, // eslint-disable-line react/prop-types
      isFormSubmitted, // eslint-disable-line react/prop-types
      validations, // eslint-disable-line react/prop-types
      validationErrors, // eslint-disable-line react/prop-types
      getValue,
      setValue,
      isValid, // eslint-disable-line react/prop-types
      isPristine, // eslint-disable-line react/prop-types
      isFormDisabled, // eslint-disable-line react/prop-types
      showError, // eslint-disable-line react/prop-types
      isValidValue, // eslint-disable-line react/prop-types
      setValidations, // eslint-disable-line react/prop-types
      resetValue, // eslint-disable-line react/prop-types
      hasValue, // eslint-disable-line react/prop-types
      getErrorMessage, // eslint-disable-line react/prop-types
      getErrorMessages, // eslint-disable-line react/prop-types
      showRequired, // eslint-disable-line react/prop-types
      validationError, // eslint-disable-line react/prop-types
      currentValue,
      value,
      onChange,
      ...rest
    } = this.props;
    return (
      <Select value={this.getValue()} onChange={this.handleChange} {...rest} />
    );
  };
}

SelectField.propTypes = {
  // hoc
  getValue: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,

  // parent
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.any,
  currentValue: PropTypes.any,
  onChange: PropTypes.func,
  fullWidth: PropTypes.bool,
  InputLabelProps: PropTypes.object,
};

SelectField.defaultProps = {
  value: '',
  currentValue: undefined,
  onChange: () => {},
  fullWidth: true,
  InputLabelProps: {
    shrink: true,
  },
};

export default compose(withFormsy)(SelectField);
