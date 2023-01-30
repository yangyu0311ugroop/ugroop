/**
 * Created by quando on 4/3/17.
 * PasswordHelpBlock
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import r from 'utils/validationrule';
import { FadeInOut, SIZE } from 'ugcomponents/Animation/index';
import { isEmptyString } from 'utils/stringAdditions';
import { UNMATCHED_PWD } from 'appConstants';

function PasswordHelpBlock(props) {
  const value = props.inputValue;
  const display = props.visibility ? 'block' : 'none';
  let content = [];
  if (props.rules.length === 1) {
    const isValid = value && props.validationTxt !== UNMATCHED_PWD;
    const label = 'matched';
    content.push(
      <FadeInOut
        colorInvalid={props.colorInvalid}
        isValid={isValid}
        size={props.size}
        key={0}
      >
        {label}
      </FadeInOut>,
    );
  } else {
    content = props.rules.map(
      ({ defaultMessage: regex, description: text }, index) => {
        const isValid = value && regex.test(value);
        return (
          <FadeInOut
            colorInvalid={props.colorInvalid}
            isValid={isValid}
            size={props.size}
            key={index} // eslint-disable-line react/no-array-index-key
          >
            {text}
          </FadeInOut>
        );
      },
    );
  }
  if (!isEmptyString(props.serverError)) {
    content = props.serverError;
  }
  return <div style={{ marginTop: -1, display }}>{content}</div>;
}

PasswordHelpBlock.propTypes = {
  inputValue: PropTypes.any,
  size: PropTypes.any,
  rules: PropTypes.array,
  visibility: PropTypes.bool,
  serverError: PropTypes.string,
  colorInvalid: PropTypes.string,
  validationTxt: PropTypes.string,
};

PasswordHelpBlock.defaultProps = {
  inputValue: '',
  rules: [
    r.minimum8CharRegex,
    r.atLeast1DigitRegex,
    r.atLeast1LowercaseRegex,
    r.atLeast1UppercaseRegex,
  ],
  size: SIZE.SM,
  validationTxt: undefined,
};

export default PasswordHelpBlock;
