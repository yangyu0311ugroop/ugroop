/**
 * Created by stephenkarpinskyj on 20/9/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Text, INPUT_CONSTANTS } from 'ugcomponents/Inputs';

export class NumberField extends React.PureComponent {
  getMakeEmptyZeroProps = () => {
    const { makeEmptyZero } = this.props;
    if (makeEmptyZero) {
      return {
        onInterceptValue: value =>
          value && value !== '0' ? value.toString() : 0,
        onInterceptSetValue: value => (value ? value.toString() : 0),
      };
    }
    return {};
  };

  getMakeEmptyMinProps = () => {
    const { min, makeEmptyMin } = this.props;
    if (makeEmptyMin && min) {
      return {
        onInterceptValue: value =>
          value && value !== '0' ? value.toString() : min,
        onInterceptSetValue: value => (value ? value.toString() : min),
      };
    }
    return {};
  };

  addIsIntValidation = ({ validations, validationErrors }) => {
    const { isInt, isIntError } = this.props;

    let v = validations;
    let ve = validationErrors;

    if (isInt) {
      v = _.assign({}, v, { isInt });
      ve = _.assign({}, ve, { isInt: isIntError });
    }

    return { validations: v, validationErrors: ve };
  };

  addMinValidation = ({ validations, validationErrors }) => {
    const {
      min,
      minError = INPUT_CONSTANTS.NUMBER_MIN_ERROR(min),
    } = this.props;

    let v = validations;
    let ve = validationErrors;

    if (!Number.isNaN(min)) {
      v = _.assign({}, v, { isGreaterThanOrEqual: min });
      ve = _.assign({}, ve, { isGreaterThanOrEqual: minError });
    }

    return { validations: v, validationErrors: ve };
  };

  addMaxValidation = ({ validations, validationErrors }) => {
    const {
      max,
      maxError = INPUT_CONSTANTS.NUMBER_MAX_ERROR(max),
    } = this.props;

    let v = validations;
    let ve = validationErrors;

    if (!Number.isNaN(max)) {
      v = _.assign({}, v, { isLessThanOrEqual: max });
      ve = _.assign({}, ve, { isLessThanOrEqual: maxError });
    }

    return { validations: v, validationErrors: ve };
  };

  buildValidations = () => {
    const { validations, validationErrors } = this.props;

    let v = { validations, validationErrors };
    v = this.addIsIntValidation(v);
    v = this.addMinValidation(v);
    v = this.addMaxValidation(v);
    return v;
  };

  render = () => {
    const {
      validations,
      validationErrors,
      makeEmptyZero,
      makeEmptyMin,
      isInt,
      isIntError,
      min,
      minError,
      max,
      maxError,
      ...rest
    } = this.props;
    return (
      <Text
        {...rest}
        {...this.buildValidations()}
        {...this.getMakeEmptyMinProps()}
        {...this.getMakeEmptyZeroProps()}
      />
    );
  };
}

NumberField.propTypes = {
  // parent
  type: PropTypes.string,
  autoComplete: PropTypes.string,
  validations: PropTypes.object,
  validationErrors: PropTypes.object,

  onInterceptValue: PropTypes.func,
  onInterceptGetValue: PropTypes.func,
  onInterceptSetValue: PropTypes.func,

  // SK: .net core back-end requires a 0 to clear a property in a patch
  // For patches, empty string is interpreted as null
  // For patches, null properties are ignored because a missing/undefined property is also interpreted as null
  // TODO: Stop formsy showing validation error when the input appears to be empty
  // Until ^, it's not recommended to use min>0 with this set
  makeEmptyMin: PropTypes.bool,
  makeEmptyZero: PropTypes.bool,

  isInt: PropTypes.bool,
  isIntError: PropTypes.string,
  min: PropTypes.number,
  minError: PropTypes.string,
  max: PropTypes.number,
  maxError: PropTypes.string,
};

NumberField.defaultProps = {
  type: 'number',
  autoComplete: 'off',
  validations: {},
  validationErrors: {},

  makeEmptyZero: false,

  isInt: true,
  isIntError: INPUT_CONSTANTS.INT_ERROR(),
  min: 0,
  max: Number.NaN,
};

export default NumberField;
