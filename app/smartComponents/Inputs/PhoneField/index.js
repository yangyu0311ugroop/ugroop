/**
 * Created by stephenkarpinskyj on 15/11/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Phone from 'smartComponents/Inputs/PhoneTextField';

export class PhoneField extends React.PureComponent {
  addIsPhoneNumberValidation = ({ validations: v }) => ({
    validations: _.assign({}, v, { isPhoneNumber: true }),
  });

  buildValidations = () => {
    const { validations, validationErrors } = this.props;

    let v = { validations, validationErrors };
    v = this.addIsPhoneNumberValidation(v);
    return v;
  };

  render = () => {
    const { validations, validationErrors, inputProps, ...rest } = this.props;
    return <Phone {...this.buildValidations()} {...rest} />;
  };
}

PhoneField.propTypes = {
  // parent
  validations: PropTypes.object,
  validationErrors: PropTypes.object,
  inputProps: PropTypes.object,
};

PhoneField.defaultProps = {
  validations: {},
  validationErrors: {},
  inputProps: {},
};

export default PhoneField;
