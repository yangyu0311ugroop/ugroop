import React, { PureComponent } from 'react';
import H4 from 'components/H4';
import { compose } from 'redux';
import { withFormsy, propTypes as formsyPropTypes } from 'formsy-react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import { FormControl, MenuItem } from '@material-ui/core';
import withValidation from 'utils/hoc/withValidation/index';

export class ValidationSelectInput extends PureComponent {
  generateChildren = () => {
    const { options, inputText } = this.props;
    return Object.keys(options).map(key => (
      <MenuItem key={key} value={options[key].code}>
        <H4 className={inputText}>{options[key].name}</H4>
      </MenuItem>
    ));
  };

  renderSelect = (required, value, onChange, id, inputStyle, otherProps) => (
    <Select
      required={required}
      value={value}
      onChange={onChange}
      input={<Input id={id} className={inputStyle} />}
      {...otherProps}
    >
      {this.generateChildren()}
    </Select>
  );

  renderFormControl = (
    formStyle,
    required,
    label,
    value,
    onChange,
    id,
    inputStyle,
    otherProps,
  ) => (
    <FormControl className={formStyle} required={required}>
      {label}
      {this.renderSelect(required, value, onChange, id, inputStyle, otherProps)}
    </FormControl>
  );

  render() {
    const {
      id,
      label,
      value,
      onChange,
      required,
      inputStyle,
      formStyle,
      onBlur,
      inputText,
      options,
      helperText,
      error,
      innerRef,
      isValid, // eslint-disable-line no-unused-vars
      ...otherProps
    } = this.props;
    return label
      ? this.renderFormControl(
          formStyle,
          required,
          label,
          value,
          onChange,
          id,
          inputStyle,
          otherProps,
        )
      : this.renderSelect(
          required,
          value,
          onChange,
          id,
          inputStyle,
          otherProps,
        );
  }
}

ValidationSelectInput.propTypes = {
  ...formsyPropTypes,
  id: PropTypes.string,
  label: PropTypes.node,
  value: PropTypes.string,
  required: PropTypes.bool,
  options: PropTypes.array,
  formStyle: PropTypes.string,
  inputText: PropTypes.string,
  inputStyle: PropTypes.string,
  helperText: PropTypes.node,
  error: PropTypes.node,
  onBlur: PropTypes.func,
};

export default compose(
  withFormsy,
  withValidation,
)(ValidationSelectInput);
