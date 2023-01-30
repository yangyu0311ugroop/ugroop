/**
 * Created by stephenkarpinskyj on 13/11/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { ARRAY_HELPERS } from 'utils/helpers/arrays';
import { Text, INPUT_CONSTANTS } from 'ugcomponents/Inputs';

export class EmailField extends React.PureComponent {
  addIsEmailValidation = ({ validations: v, validationErrors: ve }) => {
    const { isEmailError } = this.props;
    return {
      validations: _.assign({}, v, { isEmail: true }),
      validationErrors: _.assign({}, ve, { isEmail: isEmailError }),
    };
  };

  addMyEmailValidation = ({ validations, validationErrors }) => {
    const { myEmail, myEmailError } = this.props;

    let v = validations;
    let ve = validationErrors;

    if (myEmail) {
      v = _.assign({}, v, { myEmail });
      ve = _.assign({}, ve, { myEmail: myEmailError });
    }

    return { validations: v, validationErrors: ve };
  };

  addBlacklistValidation = ({ validations, validationErrors }) => {
    const { blacklist, blacklistError } = this.props;

    let v = validations;
    let ve = validationErrors;

    const blacklistArray = ARRAY_HELPERS.arrayIfNot(blacklist);

    if (blacklistArray.length) {
      const ruleName = 'emailBlacklist';
      v = _.assign({}, v, { [ruleName]: blacklistArray });
      ve = _.assign({}, ve, { [ruleName]: blacklistError });
    }

    return { validations: v, validationErrors: ve };
  };

  buildValidations = () => {
    const { validations, validationErrors } = this.props;

    let v = { validations, validationErrors };
    v = this.addIsEmailValidation(v);
    v = this.addMyEmailValidation(v);
    v = this.addBlacklistValidation(v);
    return v;
  };

  render = () => {
    const {
      validations,
      validationErrors,
      isEmailError,
      myEmail,
      myEmailError,
      blacklist,
      blacklistError,
      ...rest
    } = this.props;
    return <Text {...this.buildValidations()} {...rest} />;
  };
}

EmailField.propTypes = {
  // parent
  type: PropTypes.string,
  autoComplete: PropTypes.string,
  validations: PropTypes.object,
  validationErrors: PropTypes.object,

  isEmailError: PropTypes.string,
  myEmail: PropTypes.string,
  myEmailError: PropTypes.string,
  blacklist: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  blacklistError: PropTypes.string,
};

EmailField.defaultProps = {
  type: 'text',
  autoComplete: 'off',
  validations: {},
  validationErrors: {},

  isEmailError: INPUT_CONSTANTS.EMAIL_IS_EMAIL_ERROR(),
  myEmail: null,
  myEmailError: INPUT_CONSTANTS.EMAIL_MY_EMAIL_ERROR(),
  blacklist: null,
  blacklistError: INPUT_CONSTANTS.EMAIL_BLACKLIST_ERROR(),
};

export default EmailField;
