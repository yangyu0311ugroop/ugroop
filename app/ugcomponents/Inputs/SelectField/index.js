/**
 * Created by stephenkarpinskyj on 16/3/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { withFormsy } from 'formsy-react';
import { FormControl, FormHelperText, InputLabel } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

export const OPTION_NONE = '0';

const style = {
  select: {
    '&:focus': {
      background: 'transparent',
    },
  },
  iconDisabled: {
    color: 'transparent',
  },
};

export class SelectField extends React.Component {
  componentDidMount = () => {
    this.value = this.getDefaultValue();
    this.props.setValue(this.value);
    if (this.props.inputRef) this.props.inputRef(this);
  };

  componentWillUnmount = () => {
    if (this.props.inputRef) this.props.inputRef(null);
  };

  getDefaultValue = () => {
    const { value, options } = this.props;
    if (!value && options.length && options[0]) return options[0].value;
    return value;
  };

  getOptions = options => {
    if (!Array.isArray(options)) {
      return null;
    }

    return options.map(({ value, children, ...rest }) => (
      <option key={value} value={value} {...rest}>
        {children}
      </option>
    ));
  };

  getSelectClasses = (classes, selectClassName, disabled) => ({
    select: classNames(classes.select, selectClassName),
    icon: disabled && classes.iconDisabled,
  });

  getValue = () => this.props.getValue();

  isDisabled = () => this.props.isFormDisabled() || this.props.disabled;

  handleChange = ({ target: { value, selectedIndex, options = [] } }) => {
    const { setValue, onChange } = this.props;
    this.value = value;
    setValue(value);

    if (onChange) onChange(value, get(options, `${selectedIndex}.text`));
    this.forceUpdate();
  };

  renderLabel = label =>
    label ? <InputLabel shrink>{label}</InputLabel> : null;

  renderHelperText = (errorMessage, helperText) => {
    const text = errorMessage || helperText;
    return text ? <FormHelperText>{text}</FormHelperText> : null;
  };

  renderNone = () => {
    const { noneValue, noneLabel } = this.props;

    return (
      <option key={OPTION_NONE} value={noneValue}>
        {noneLabel}
      </option>
    );
  };

  render = () => {
    const {
      classes,
      // eslint-disable-next-line no-unused-vars, react/prop-types
      value,
      validations, // eslint-disable-line no-unused-vars, react/prop-types
      setValidations, // eslint-disable-line no-unused-vars, react/prop-types
      setValue,
      resetValue, // eslint-disable-line no-unused-vars, react/prop-types
      getValue,
      hasValue, // eslint-disable-line no-unused-vars, react/prop-types
      getErrorMessage,
      getErrorMessages, // eslint-disable-line no-unused-vars, react/prop-types
      isFormDisabled,
      isValid, // eslint-disable-line no-unused-vars, react/prop-types
      isPristine, // eslint-disable-line no-unused-vars, react/prop-types
      isFormSubmitted, // eslint-disable-line no-unused-vars, react/prop-types
      isRequired, // eslint-disable-line no-unused-vars, react/prop-types
      showRequired,
      showError, // eslint-disable-line no-unused-vars, react/prop-types
      isValidValue, // eslint-disable-line no-unused-vars, react/prop-types
      validationError, // eslint-disable-line no-unused-vars, react/prop-types
      validationErrors, // eslint-disable-line no-unused-vars, react/prop-types
      innerRef, // eslint-disable-line no-unused-vars, react/prop-types
      noneValue,
      noneLabel,
      options,
      type,
      onChange,
      inputRef,
      label,
      helperText,
      disabled: disabledProp,
      fullWidth,
      formControlProps,
      selectClassName,
      optionRendered,
      showNone,
      ...props
    } = this.props;
    if (type === 'hidden') return null;

    const renderOptions = LOGIC_HELPERS.ifElse(
      optionRendered,
      options,
      this.getOptions(options),
    );
    const renderNone = LOGIC_HELPERS.ifElse(showNone, this.renderNone());
    const disabled = this.isDisabled();
    const errorMessage = getErrorMessage();
    return (
      <FormControl
        error={!!errorMessage}
        required={showRequired()}
        disabled={disabled}
        fullWidth={fullWidth}
        {...formControlProps}
      >
        {this.renderLabel(label)}
        <Select
          classes={this.getSelectClasses(classes, selectClassName, disabled)}
          value={this.getValue()}
          onChange={this.handleChange}
          native
          {...props}
        >
          {renderNone}
          {renderOptions}
        </Select>
        {this.renderHelperText(errorMessage, helperText)}
      </FormControl>
    );
  };
}

SelectField.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  getValue: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  getErrorMessage: PropTypes.func.isRequired,
  showRequired: PropTypes.func.isRequired,
  isFormDisabled: PropTypes.func.isRequired,

  // parent
  options: PropTypes.any.isRequired,
  type: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  inputRef: PropTypes.func,
  label: PropTypes.any,
  helperText: PropTypes.any,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  formControlProps: PropTypes.object,
  selectClassName: PropTypes.string,

  optionRendered: PropTypes.bool,
  showNone: PropTypes.bool,
  noneValue: PropTypes.any,
  noneLabel: PropTypes.string,
};

SelectField.defaultProps = {
  type: null,
  value: '',
  onChange: null,
  inputRef: null,
  label: '',
  helperText: '',
  disabled: false,
  fullWidth: true,
  formControlProps: {},
  selectClassName: null,

  optionRendered: false,
  showNone: false,
  noneValue: 0,
  noneLabel: 'None',
};

export default compose(
  withFormsy,
  withStyles(style, { name: 'SelectField' }),
)(SelectField);
