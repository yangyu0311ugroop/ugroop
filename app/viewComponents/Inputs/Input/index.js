/**
 * Created by stephenkarpinskyj on 5/7/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import MuiInput from '@material-ui/core/Input';

/**
 * To be used inline with other text.
 */
// eslint-disable-next-line react/prefer-stateless-function
export class Input extends React.Component {
  render = () => <MuiInput {...this.props} />;
}

Input.propTypes = {
  // parent
  /** Required if uncontrolled */
  defaultValue: PropTypes.any,
  /** Set to become controlled */
  value: PropTypes.any,
  placeholder: PropTypes.string,
  disableUnderline: PropTypes.bool,
};

Input.defaultProps = {
  defaultValue: undefined,
  value: undefined,
  disableUnderline: true,
};

export default Input;
