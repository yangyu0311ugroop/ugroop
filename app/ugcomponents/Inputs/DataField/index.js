/**
 * Created by stephenkarpinskyj on 16/3/18.
 */

import { withFormsy } from 'formsy-react';
import PropTypes from 'prop-types';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

export class DataField extends React.PureComponent {
  componentDidMount = () => {
    this.checkCurrentValue();
  };

  componentDidUpdate = () => {
    this.checkCurrentValue();
  };

  checkCurrentValue = () => {
    const { currentValue, getValue, setValue, onChange } = this.props;

    if (currentValue !== undefined && getValue() !== currentValue) {
      setValue(currentValue);
      LOGIC_HELPERS.ifFunction(onChange, [currentValue]);
    }
  };

  render = () => null;
}

DataField.propTypes = {
  // hoc
  getValue: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,

  // used by hoc
  name: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
  value: PropTypes.any, // eslint-disable-line react/no-unused-prop-types

  // parent
  currentValue: PropTypes.any,
  onChange: PropTypes.func,
};

DataField.defaultProps = {};

export default withFormsy(DataField);
