/**
 * Created by stephenkarpinskyj on 20/9/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import MOMENT_HELPERS from 'utils/helpers/moment';
import { Text, INPUT_CONSTANTS } from 'ugcomponents/Inputs';

export class DurationField extends React.PureComponent {
  addIsDurationValidation = ({ validations: v, validationErrors: ve }) => {
    const { isDurationError } = this.props;
    return {
      validations: _.assign({}, v, { isDuration: true }),
      validationErrors: _.assign({}, ve, { isDuration: isDurationError }),
    };
  };

  addIsDurationPositiveValidation = ({ validations, validationErrors }) => {
    const { isDurationPositive, isDurationPositiveError } = this.props;

    let v = validations;
    let ve = validationErrors;

    if (isDurationPositive) {
      v = _.assign({}, v, { isDurationPositive: true });
      ve = _.assign({}, ve, { isDurationPositive: isDurationPositiveError });
    }

    return { validations: v, validationErrors: ve };
  };

  buildValidations = () => {
    const { validations, validationErrors } = this.props;

    let v = { validations, validationErrors };
    v = this.addIsDurationValidation(v);
    v = this.addIsDurationPositiveValidation(v);
    return v;
  };

  render = () => {
    const {
      validations,
      validationErrors,
      isDurationError,
      isDurationPositive,
      isDurationPositiveError,
      ...rest
    } = this.props;
    return <Text {...this.buildValidations()} {...rest} />;
  };
}

DurationField.propTypes = {
  // parent
  type: PropTypes.string,
  autoComplete: PropTypes.string,
  placeholder: PropTypes.string,
  validations: PropTypes.object,
  validationErrors: PropTypes.object,

  onInterceptValue: PropTypes.func,

  isDurationError: PropTypes.string,
  isDurationPositive: PropTypes.bool,
  isDurationPositiveError: PropTypes.string,
};

DurationField.defaultProps = {
  type: 'text',
  autoComplete: 'off',
  placeholder: INPUT_CONSTANTS.DURATION_PLACEHOLDER,
  validations: {},
  validationErrors: {},

  onInterceptValue: MOMENT_HELPERS.stringifyDuration,

  isDurationError: INPUT_CONSTANTS.DURATION_ERROR(),
  isDurationPositive: true,
  isDurationPositiveError: INPUT_CONSTANTS.DURATION_POSITIVE_ERROR(),
};

export default DurationField;
