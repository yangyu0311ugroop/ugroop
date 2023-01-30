/**
 * Created by stephenkarpinskyj on 4/9/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { DEFAULT_DURATION } from 'utils/constants/dateTime';
import { NODE_HELPERS } from 'utils/helpers/nodes';
import { Select } from 'ugcomponents/Inputs';
import timeUtils from '../../../../utils';

export class DayDurationInput extends React.PureComponent {
  getParentNodeId = () => {
    const { parentNodeId, dayId } = this.props;
    return parentNodeId || dayId;
  };

  getValue = options => {
    const {
      mode,
      position,
      value,
      otherValue,
      defaultValue,
      dayDates,
    } = this.props;
    let v;
    if (value) {
      const parentDateTime = this.calculateParentDateTime();
      const parentNodeId = this.getParentNodeId();
      const dateTime = timeUtils.calculateDateTime(
        mode,
        position,
        value,
        otherValue,
        parentNodeId,
        dayDates,
      );
      v = NODE_HELPERS.calculateDayDuration(
        parentDateTime,
        dateTime,
      ).toISOString();
    } else {
      v = defaultValue;
    }
    if (!options.find(o => o.value === v) && options.length) {
      v = options[0].value;
    }
    return v;
  };

  calculateParentDateTime = () => {
    const { mode, position, otherValue, dayDates } = this.props;
    const parentNodeId = this.getParentNodeId();
    const date = timeUtils.getDate(parentNodeId, dayDates);
    return timeUtils.addStartDuration(mode, position, date, otherValue);
  };

  calculateOtherDateTime = () => {
    const { otherCalculatedTimeValue } = this.props;
    return otherCalculatedTimeValue;
  };

  includeOptionsDates = () => {
    const { otherFormCalculatedTimeMode, calculatedTimeMode } = this.props;
    return NODE_HELPERS.isAnchored(
      otherFormCalculatedTimeMode || calculatedTimeMode,
    );
  };

  renderOptions = () => {
    const { renderDuration, renderDate, dayDates } = this.props;
    return timeUtils.renderDayDurationOptions(
      this.calculateOtherDateTime(),
      dayDates,
      renderDuration,
      renderDate,
      this.includeOptionsDates(),
    );
  };

  render = () => {
    const { inputs } = this.props;
    const options = this.renderOptions();
    return (
      <Select
        value={this.getValue(options)}
        options={options}
        onChange={this.handleChange}
        {...inputs.tempDay}
      />
    );
  };
}

DayDurationInput.propTypes = {
  // parent
  value: PropTypes.string,
  inputs: PropTypes.object,
  mode: PropTypes.string,
  position: PropTypes.string,
  renderDuration: PropTypes.func,
  renderDate: PropTypes.func,
  otherValue: PropTypes.string,
  otherCalculatedTimeValue: PropTypes.string,
  otherFormCalculatedTimeMode: PropTypes.string,
  defaultValue: PropTypes.string,
  parentNodeId: PropTypes.number,
  dayDates: PropTypes.arrayOf(PropTypes.object),
  calculatedTimeMode: PropTypes.string,
  dayId: PropTypes.number,
};

DayDurationInput.defaultProps = {
  value: '',
  inputs: {},
  mode: null,
  position: null,
  renderDuration: timeUtils.renderDayCount,
  renderDate: () => '',
  otherValue: '',
  otherCalculatedTimeValue: null,
  otherFormCalculatedTimeMode: null,
  defaultValue: DEFAULT_DURATION,
  parentNodeId: 0,
  dayDates: [],
  calculatedTimeMode: null,
  dayId: null,
};

export default DayDurationInput;
