import { FilledTextField } from 'components/Inputs/TextField/components/FilledInputs/index';
import { withStyles } from 'components/material-ui';
import { withFormsy } from 'formsy-react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import styles from './styles';

// FormsyFilledTextField
export class FText extends PureComponent {
  componentDidUpdate = prevProps => {
    const { forceValue } = this.props;

    if (forceValue !== undefined && forceValue !== prevProps.forceValue) {
      this.setValue(forceValue);
    }
  };

  changeValue = event => {
    const value = get(event, 'currentTarget.value');

    this.setValue(value);
  };

  setValue = value => {
    const { onChange, setValue, getValue } = this.props;

    const currentValue = getValue();

    if (value === currentValue) return null;

    setValue(value);
    LOGIC_HELPERS.ifFunction(onChange, [value]);
    return this.forceUpdate();
  };

  render = () => {
    const {
      classes,
      getValue,
      setValue,
      value,
      forceValue,
      ...rest
    } = this.props;

    const currentValue = getValue();

    return (
      <FilledTextField
        {...LOGIC_HELPERS.ifElse(
          currentValue,
          { InputLabelProps: { shrink: true } },
          {},
        )}
        key={forceValue}
        value={currentValue}
        onChange={this.changeValue}
        {...rest}
      />
    );
  };
}

FText.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  getValue: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,

  // parent props
  value: PropTypes.string, // initial value
  forceValue: PropTypes.string, // force change value
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  fullWidth: PropTypes.bool,

  // resaga props
};

FText.defaultProps = {
  fullWidth: true,
};

export default compose(
  withStyles(styles, { name: 'FText' }),
  withFormsy,
)(FText);
