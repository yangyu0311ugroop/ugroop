/**
 * Created by stephenkarpinskyj on 20/9/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Text, INPUT_CONSTANTS } from 'ugcomponents/Inputs';

export class TextField extends React.PureComponent {
  addMinLengthValidation = ({ validations, validationErrors }) => {
    const {
      minLength,
      minLengthError = INPUT_CONSTANTS.TEXT_MIN_ERROR(minLength),
    } = this.props;

    let v = validations;
    let ve = validationErrors;

    if (minLength && !Number.isNaN(minLength)) {
      v = _.assign({}, v, { minLength });
      ve = _.assign({}, ve, { minLength: minLengthError });
    }

    return { validations: v, validationErrors: ve };
  };

  addMaxLengthValidation = ({ validations, validationErrors }) => {
    const {
      maxLength,
      maxLengthError = INPUT_CONSTANTS.TEXT_MAX_ERROR(maxLength),
    } = this.props;

    let v = validations;
    let ve = validationErrors;

    if (maxLength && !Number.isNaN(maxLength)) {
      v = _.assign({}, v, { maxLength });
      ve = _.assign({}, ve, { maxLength: maxLengthError });
    }

    return { validations: v, validationErrors: ve };
  };

  buildValidations = () => {
    const { validations, validationErrors } = this.props;

    let v = { validations, validationErrors };
    v = this.addMinLengthValidation(v);
    v = this.addMaxLengthValidation(v);
    return v;
  };

  render = () => {
    const {
      validations,
      validationErrors,
      minLength,
      minLengthError,
      maxLength,
      maxLengthError,
      ...rest
    } = this.props;
    return <Text {...this.buildValidations()} {...rest} />;
  };
}

TextField.propTypes = {
  // parent
  type: PropTypes.string,
  validations: PropTypes.object,
  validationErrors: PropTypes.object,

  minLength: PropTypes.number,
  minLengthError: PropTypes.string,
  maxLength: PropTypes.number,
  maxLengthError: PropTypes.string,
};

TextField.defaultProps = {
  type: 'text',
  validations: {},
  validationErrors: {},

  minLength: 0,
  maxLength: 0,
};

export default TextField;
