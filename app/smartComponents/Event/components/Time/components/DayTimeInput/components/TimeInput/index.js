/**
 * Created by stephenkarpinskyj on 4/9/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { NODE_HELPERS } from 'utils/helpers/nodes';
import { Time } from 'smartComponents/Inputs';
import timeUtils from '../../../../utils';

export class TimeInput extends React.PureComponent {
  getFixedValue = () => {
    const { value, mode } = this.props;
    if (NODE_HELPERS.hasTimeComponent(mode)) {
      return value;
    }
    return '';
  };

  getRelativeValue = () => {
    const {
      position,
      value,
      mode,
      otherValue,
      parentNodeId,
      dayDates,
    } = this.props;
    const dateTime = timeUtils.calculateDateTime(
      mode,
      position,
      value,
      otherValue,
      parentNodeId,
      dayDates,
    );
    return NODE_HELPERS.hasTimeComponent(mode) ? dateTime : '';
  };

  getValue = () => {
    const { mode } = this.props;
    if (NODE_HELPERS.isFixed(mode)) {
      return this.getFixedValue();
    }
    return this.getRelativeValue();
  };

  render = () => {
    const { inputs, timePlaceholder } = this.props;
    return (
      <Time
        value={this.getValue()}
        placeholder={timePlaceholder}
        {...inputs.tempTime}
      />
    );
  };
}

TimeInput.propTypes = {
  // parent
  value: PropTypes.string,
  inputs: PropTypes.object,
  mode: PropTypes.string,
  timePlaceholder: PropTypes.string,
  position: PropTypes.string,
  otherValue: PropTypes.string,
  parentNodeId: PropTypes.number,
  dayDates: PropTypes.arrayOf(PropTypes.object),
};

TimeInput.defaultProps = {
  value: '',
  inputs: {},
  mode: null,
  timePlaceholder: 'Time',
  position: null,
  otherValue: '',
  parentNodeId: 0,
  dayDates: [],
};

export default TimeInput;
