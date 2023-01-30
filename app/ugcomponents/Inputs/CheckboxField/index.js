/**
 * Created by stephenkarpinskyj on 16/3/18.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { withFormsy } from 'formsy-react';
import { FormControlLabel } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { SIZE_CONSTANTS } from 'sizeConstants';
import Icon from 'ugcomponents/Icon';

const style = {
  root: {
    width: '100%',
    '& > div > div': {
      width: '100%',
      '& > div > input': {
        backgroundColor: 'transparent',
      },
    },
  },
  noMargin: {
    marginLeft: 0,
    marginRight: 0,
  },
  compact: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  formControlCompact: {
    margin: 'unset',
  },
  [`${SIZE_CONSTANTS.SM}Label`]: {
    fontSize: 12,
  },
};

export class CheckboxField extends Component {
  getIconSize = () => {
    const { size } = this.props;
    switch (size) {
      case SIZE_CONSTANTS.SM:
        return 'medium';
      default:
        return 'mediumPlus';
    }
  };

  isDisabled = () => this.props.isFormDisabled() || this.props.disabled;

  handleChange = event => {
    const { onChange } = this.props;

    this.props.setValue(event.target.checked);
    this.forceUpdate();

    if (onChange) onChange(event, event.target.checked);
  };

  isChecked = () => {
    const { currentValue, getValue } = this.props;

    if (typeof currentValue !== 'undefined') {
      return currentValue || false;
    }

    return getValue() || false;
  };

  render = () => {
    const {
      classes,
      className,
      // eslint-disable-next-line no-unused-vars, react/prop-types
      currentValue,
      value,
      validations, // eslint-disable-line no-unused-vars, react/prop-types
      setValidations, // eslint-disable-line no-unused-vars, react/prop-types
      setValue,
      resetValue, // eslint-disable-line no-unused-vars, react/prop-types
      getValue,
      hasValue, // eslint-disable-line no-unused-vars, react/prop-types
      getErrorMessage, // eslint-disable-line no-unused-vars, react/prop-types
      getErrorMessages, // eslint-disable-line no-unused-vars, react/prop-types
      isFormDisabled,
      isValid, // eslint-disable-line no-unused-vars, react/prop-types
      isPristine, // eslint-disable-line no-unused-vars, react/prop-types
      isFormSubmitted, // eslint-disable-line no-unused-vars, react/prop-types
      isRequired, // eslint-disable-line no-unused-vars, react/prop-types
      showRequired, // eslint-disable-line no-unused-vars, react/prop-types
      showError, // eslint-disable-line no-unused-vars, react/prop-types
      isValidValue, // eslint-disable-line no-unused-vars, react/prop-types
      validationError, // eslint-disable-line no-unused-vars, react/prop-types
      validationErrors, // eslint-disable-line no-unused-vars, react/prop-types
      innerRef,
      type,
      label,
      FormControlLabelProps,
      noMargin,
      compact,
      size,
      ...props
    } = this.props;
    if (type === 'hidden') return null;

    const checkboxLabel =
      typeof label === 'function'
        ? label({ isChecked: this.isChecked() })
        : label;

    return (
      <div className={classes.root}>
        <FormControlLabel
          label={checkboxLabel}
          className={classnames(
            { [classes.noMargin]: noMargin },
            compact && classes.formControlCompact,
          )}
          classes={{ label: size && classes[`${size}Label`] }}
          control={
            <Checkbox
              {...props}
              className={classnames(className, compact && classes.compact)}
              onChange={this.handleChange}
              checkedIcon={
                <Icon size={this.getIconSize()} icon="lnr-check-square" />
              }
              icon={<Icon size={this.getIconSize()} icon="lnr-square" />}
              checked={this.isChecked()}
              color="primary"
            />
          }
          disabled={this.isDisabled()}
          {...FormControlLabelProps}
        />
      </div>
    );
  };
}

CheckboxField.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  getValue: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  isFormDisabled: PropTypes.func.isRequired,

  // parent
  className: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.any,
  innerRef: PropTypes.any,
  onChange: PropTypes.func,
  currentValue: PropTypes.bool,
  disabled: PropTypes.bool,
  FormControlLabelProps: PropTypes.object,
  noMargin: PropTypes.bool,
  compact: PropTypes.bool,
  size: PropTypes.oneOf([null, SIZE_CONSTANTS.SM]),

  // props to pass
  value: PropTypes.bool,
};

CheckboxField.defaultProps = {
  className: null,
  type: null,
  value: false,
  label: '',
  disabled: false,
  FormControlLabelProps: {},
  noMargin: false,
  compact: false,
  size: null,
};

export default compose(
  withStyles(style, { name: 'CheckboxField' }),
  withFormsy,
)(CheckboxField);
