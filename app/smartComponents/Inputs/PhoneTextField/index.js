import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { compose } from 'redux';
import { withFormsy } from 'formsy-react';
import { InputLabel } from 'components/material-ui';
import { isValidNumber } from 'libphonenumber-js';
import withFormsyInterceptor from 'utils/hoc/withFormsyInterceptor';
import withValidation from 'utils/hoc/withValidation/index';
import PhoneInput from 'react-phone-number-input';
import { formatNumber } from 'libphonenumber-js/custom';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { LOGIC_HELPERS } from '../../../utils/helpers/logic';

export class PhoneTextField extends PureComponent {
  state = {
    active: false,
  };

  onChange = (value = '') => {
    this.props.onChange({ target: { value } });
  };

  getInputComponent = () => {
    const { readOnly } = this.props;

    return readOnly ? this.renderReadOnly : undefined;
  };

  handleChange = (value = '') => {
    if (!this.changeValue) {
      this.changeValue = this.onChange;
    }
    this.changeValue(value);
    this.forceUpdate();
  };

  toggleActive = active => () => {
    this.setState({ active });
  };

  checkIfValid = value => {
    if (!value) {
      return null;
    }
    return isValidNumber(value);
  };

  checkIfError = (isError = '') => {
    if (isError === '') {
      return false;
    }
    return isError;
  };

  renderLabel = isError => {
    const { active } = this.state;
    const { classes, required, label } = this.props;
    const asterisk = LOGIC_HELPERS.ifElse(required, ' *', '');
    return (
      label && (
        <InputLabel
          classes={{
            root: classnames({
              [classes.labelRoot]: true,
              [classes.labelRootActive]: active,
              [classes.labelRootError]: isError,
            }),
          }}
          shrink
        >
          {label}
          {asterisk}
        </InputLabel>
      )
    );
  };

  renderReadOnly = ({ value, country, metadata }) => (
    <div>{formatNumber(value, country, 'International', metadata)}</div>
  );

  render() {
    const {
      classes,
      className,
      placeholder,
      required,
      value,
      label,
      isValid,
      helperText,
      inline,
      readOnly,
      ...props
    } = this.props;
    const { active } = this.state;

    // TODO: Use formsy validation + error messages to control this
    const checkValid = this.checkIfValid(value);
    let errorMessage = '';
    let isError = '';

    if (checkValid !== null) {
      errorMessage = checkValid ? undefined : 'Invalid phone number';
      isError = this.checkIfError(!checkValid);
    }

    const countryOptions = ['AU', '|', '...'];

    return (
      <React.Fragment>
        {this.renderLabel(isError)}
        <PhoneInput
          inputComponent={this.getInputComponent()}
          {...props}
          value={value}
          countryOptions={countryOptions}
          placeholder={placeholder}
          onChange={this.handleChange}
          onFocus={this.toggleActive(true)}
          onBlur={this.toggleActive(false)}
          className={classnames(
            classes.root,
            active && !readOnly && classes.active,
            isError && value !== '' && classes.error,
            {
              [classes.inline]: inline,
              [classes.readOnly]: readOnly,
            },
            className,
          )}
          error={errorMessage}
          required={required}
          indicateInvalid
          disabled={readOnly}
        />
      </React.Fragment>
    );
  }
}

PhoneTextField.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  isValid: PropTypes.func,
  required: PropTypes.bool,
  value: PropTypes.string,
  label: PropTypes.any,
  onChange: PropTypes.func,
  helperText: PropTypes.string,
  debouncems: PropTypes.number,
  inline: PropTypes.bool,
  readOnly: PropTypes.bool,
  validations: PropTypes.string,
  country: PropTypes.string,
};

PhoneTextField.defaultProps = {
  label: null,
  debouncems: 500,
  inline: false,
  readOnly: false,
  validations: 'isPhoneNumber',
  // TODO: Find a better way for getting the country of the currently logged in user
  country: 'AU',
};

export default compose(
  withFormsyInterceptor,
  withFormsy,
  withValidation,
  withStyles(styles, { name: 'ViewComponentsPhoneTextField' }),
)(PhoneTextField);
