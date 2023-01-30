/**
 * Created by stephenkarpinskyj on 5/9/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Duration } from 'smartComponents/Inputs';

export class DurationInput extends React.PureComponent {
  render = () => {
    const { value, inputs } = this.props;
    return <Duration value={value} {...inputs.tempDay} />;
  };
}

DurationInput.propTypes = {
  // parent
  value: PropTypes.string,
  inputs: PropTypes.object,
};

DurationInput.defaultProps = {
  value: '',
  inputs: {},
};

export default DurationInput;
