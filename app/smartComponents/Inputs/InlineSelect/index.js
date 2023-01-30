/**
 * Created by stephenkarpinskyj on 16/8/18.
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withFormsy } from 'formsy-react';
import { withStyles } from 'components/material-ui';
import Select from 'viewComponents/Inputs/Select';
import classNames from 'classnames';
import style from './style';

export class InlineSelect extends PureComponent {
  componentDidMount = () => {
    const { currentValue } = this.props;
    if (currentValue) {
      this.setValue(currentValue);
    }
  };

  componentDidUpdate = prevProps => {
    const { currentValue } = this.props;
    if (currentValue && prevProps.currentValue !== currentValue) {
      this.setValue(currentValue);
    }
  };

  getSelectClasses = (classes, customSelectClass) => {
    if (!this.selectClasses) {
      this.selectClasses = {
        select: classNames(classes.select, customSelectClass),
        icon: classes.selectIcon,
      };
    }
    return this.selectClasses;
  };

  getValue = () => {
    const { currentValue, getValue } = this.props;
    if (currentValue !== undefined) return currentValue;
    return getValue();
  };

  setValue = value => {
    const { setValue } = this.props;
    setValue(value);
  };

  handleChange = ({ target: { value } }) => {
    const { onChange } = this.props;
    this.setValue(value);
    onChange(value);
  };

  render = () => {
    const {
      // eslint-disable-line react/prop-types
      isRequired, // eslint-disable-line react/prop-types
      isFormSubmitted, // eslint-disable-line react/prop-types
      validations, // eslint-disable-line react/prop-types
      validationErrors, // eslint-disable-line react/prop-types
      getValue, // eslint-disable-line react/prop-types
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
      classes,
      currentValue,
      value,
      onChange,
      fullWidth,
      customSelectClass,
      ...rest
    } = this.props;
    return (
      <Select
        classes={this.getSelectClasses(classes, customSelectClass)}
        value={this.getValue()}
        onChange={this.handleChange}
        fullWidth={fullWidth}
        disableUnderline
        {...rest}
      />
    );
  };
}

InlineSelect.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  getValue: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,

  // parent
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.any,
  currentValue: PropTypes.any,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  customSelectClass: PropTypes.string,
};

InlineSelect.defaultProps = {
  value: '',
  currentValue: undefined,
  onChange: () => {},
  disabled: false,
  fullWidth: false,
};

export default compose(
  withFormsy,
  withStyles(style, { name: 'smartComponents/Inputs/InlineSelect' }),
)(InlineSelect);
