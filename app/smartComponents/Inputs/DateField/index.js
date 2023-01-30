/**
 * Created by stephenkarpinskyj on 20/9/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Date, INPUT_CONSTANTS } from 'ugcomponents/Inputs';

export class DateField extends React.PureComponent {
  getMinDate = () => {
    const { minDate = INPUT_CONSTANTS.DATE_MIN } = this.props;
    return minDate || undefined;
  };

  getMinDateError = () => {
    const { displayFormat } = this.props;
    const minDate = this.getMinDate();
    const {
      minDateError = INPUT_CONSTANTS.DATE_MIN_ERROR(minDate, displayFormat),
    } = this.props;
    return minDateError;
  };

  getMaxDate = () => {
    const { maxDate } = this.props;
    return maxDate || undefined;
  };

  getMaxDateError = () => {
    const { displayFormat } = this.props;
    const maxDate = this.getMaxDate();
    const {
      maxDateError = INPUT_CONSTANTS.DATE_MAX_ERROR(maxDate, displayFormat),
    } = this.props;
    return maxDateError;
  };

  addIsDateValidation = ({ validations: v, validationErrors: ve }) => {
    const {
      displayFormat,
      isDateError = INPUT_CONSTANTS.DATE_ERROR(displayFormat),
    } = this.props;
    return {
      validations: _.assign({}, v, { isDate: true }),
      validationErrors: _.assign({}, ve, { isDate: isDateError }),
    };
  };

  addMinDateValidation = ({ validations, validationErrors }) => {
    const minDate = this.getMinDate();
    const minDateError = this.getMinDateError();

    let v = validations;
    let ve = validationErrors;

    if (minDate) {
      v = _.assign({}, v, { minDate });
      ve = _.assign({}, ve, { minDate: minDateError });
    }

    return { validations: v, validationErrors: ve };
  };

  addMaxDateValidation = ({ validations, validationErrors }) => {
    const maxDate = this.getMaxDate();
    const maxDateError = this.getMaxDateError();

    let v = validations;
    let ve = validationErrors;

    if (maxDate) {
      v = _.assign({}, v, { maxDate });
      ve = _.assign({}, ve, { maxDate: maxDateError });
    }

    return { validations: v, validationErrors: ve };
  };

  buildValidations = () => {
    const { validations, validationErrors } = this.props;

    let v = { validations, validationErrors };
    v = this.addIsDateValidation(v);
    v = this.addMinDateValidation(v);
    v = this.addMaxDateValidation(v);
    return v;
  };

  render = () => {
    const {
      validations,
      validationErrors,
      isDateError,
      minDate,
      minDateError,
      maxDate,
      maxDateError,
      ...rest
    } = this.props;
    return (
      <Date
        {...this.buildValidations()}
        minDate={this.getMinDate()}
        minDateMessage={this.getMinDateError()}
        maxDate={this.getMaxDate()}
        maxDateMessage={this.getMaxDateError()}
        {...rest}
      />
    );
  };
}

DateField.propTypes = {
  // parent
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  type: PropTypes.string,
  autoComplete: PropTypes.string,
  displayFormat: PropTypes.string,
  validations: PropTypes.object,
  validationErrors: PropTypes.object,

  isDateError: PropTypes.string,
  minDate: PropTypes.any,
  minDateError: PropTypes.string,
  maxDate: PropTypes.any,
  maxDateError: PropTypes.string,
};

DateField.defaultProps = {
  value: null,
  type: 'text',
  autoComplete: 'off',
  displayFormat: INPUT_CONSTANTS.DATE_DISPLAY_FORMAT,
  validations: {},
  validationErrors: {},
};

export default DateField;
