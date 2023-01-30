/**
 * Created by stephenkarpinskyj on 20/9/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import { Time, INPUT_CONSTANTS } from 'ugcomponents/Inputs';

export class TimeField extends React.PureComponent {
  getValue = () => {
    const { value } = this.props;
    return value ? MOMENT_HELPERS.createUtc(value) : undefined;
  };

  addIsTimeValidation = ({ validations: v, validationErrors: ve }) => {
    const {
      displayFormat,
      isTimeError = INPUT_CONSTANTS.TIME_ERROR(displayFormat),
    } = this.props;
    return {
      validations: _.assign({}, v, { isTime: true }),
      validationErrors: _.assign({}, ve, { isTime: isTimeError }),
    };
  };

  addMinTimeFieldValidation = ({ validations, validationErrors }) => {
    const { minTimeField, minTimeFieldError } = this.props;

    let v = validations;
    let ve = validationErrors;

    if (minTimeField) {
      v = _.assign({}, v, { minTimeField });
      ve = _.assign({}, ve, { minTimeField: minTimeFieldError });
    }

    return { validations: v, validationErrors: ve };
  };

  addMaxTimeFieldValidation = ({ validations, validationErrors }) => {
    const { maxTimeField, maxTimeFieldError } = this.props;

    let v = validations;
    let ve = validationErrors;

    if (maxTimeField) {
      v = _.assign({}, v, { maxTimeField });
      ve = _.assign({}, ve, { maxTimeField: maxTimeFieldError });
    }

    return { validations: v, validationErrors: ve };
  };

  buildValidations = () => {
    const { validations, validationErrors } = this.props;

    let v = { validations, validationErrors };
    v = this.addIsTimeValidation(v);
    v = this.addMinTimeFieldValidation(v);
    v = this.addMaxTimeFieldValidation(v);
    return v;
  };

  render = () => {
    const {
      value,
      validations,
      validationErrors,
      isTimeError,
      minTimeField,
      minTimeFieldError,
      maxTimeField,
      maxTimeFieldError,
      ...rest
    } = this.props;
    return (
      <Time value={this.getValue()} {...this.buildValidations()} {...rest} />
    );
  };
}

TimeField.propTypes = {
  // parent
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  type: PropTypes.string,
  autoComplete: PropTypes.string,
  displayFormat: PropTypes.string,
  validations: PropTypes.object,
  validationErrors: PropTypes.object,

  isTimeError: PropTypes.string,
  minTimeField: PropTypes.string,
  minTimeFieldError: PropTypes.string,
  maxTimeField: PropTypes.string,
  maxTimeFieldError: PropTypes.string,
};

TimeField.defaultProps = {
  value: null,
  type: 'text',
  autoComplete: 'off',
  displayFormat: INPUT_CONSTANTS.TIME_DISPLAY_FORMAT,
  validations: {},
  validationErrors: {},

  minTimeField: null,
  minTimeFieldError: INPUT_CONSTANTS.TIME_MIN_FIELD_ERROR(),
  maxTimeField: null,
  maxTimeFieldError: INPUT_CONSTANTS.TIME_MAX_FIELD_ERROR(),
};

export default TimeField;
