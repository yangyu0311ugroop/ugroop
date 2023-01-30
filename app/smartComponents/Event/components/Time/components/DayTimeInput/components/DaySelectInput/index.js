/**
 * Created by stephenkarpinskyj on 4/9/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import resaga from 'resaga';
import { NODE_CONSTANTS } from 'utils/constants/nodes';
import { Select, Data } from 'ugcomponents/Inputs';
import timeUtils from '../../../../utils';
import { CONFIG } from './config';

export class DaySelectInput extends React.PureComponent {
  state = {
    value: undefined,
  };

  componentDidMount = () => {
    this.setCalculatedValues(this.getValue());
  };

  componentDidUpdate = prevProps => {
    if (!prevProps.dayDates.length && this.props.dayDates.length) {
      this.setCalculatedValues(this.getValue());
    }
  };

  componentWillUnmount = () => {
    this.unsetCalculatedValues();
  };

  getValue = () => {
    const {
      mode,
      position,
      value,
      otherValue,
      parentNodeId,
      dayDates,
      dayId,
    } = this.props;
    const dateTime = timeUtils.calculateDateTime(
      mode,
      position,
      value,
      otherValue,
      parentNodeId,
      dayDates,
    );
    const id =
      timeUtils.getClosestDayId(dateTime, parentNodeId, dayDates) || dayId;
    return id ? id.toString() : this.getTabId();
  };

  getCurrentValue = value => {
    const { value: currentValue } = this.state;
    return currentValue === undefined ? value : currentValue;
  };

  getTabId = () => {
    const { tabId } = this.props;
    return tabId ? tabId.toString() : tabId;
  };

  getModeValue = value => {
    const { defaultMode, formBatchCreate } = this.props;
    return value === this.getTabId() && !formBatchCreate
      ? NODE_CONSTANTS.TIME_MODES.unanchored
      : defaultMode;
  };

  setCalculatedValues = value => {
    const { dayDates } = this.props;
    const dayId = Number.parseInt(value, 10);
    const defaultDate = _.get(dayDates, '0.value', undefined);
    const date = timeUtils.getDate(dayId, dayDates, defaultDate);
    this.props.resaga.setValue({
      calculatedTimeValue: date,
      calculatedTimeMode: this.getModeValue(value),
    });
  };

  unsetCalculatedValues = () => {
    this.props.resaga.setValue({
      calculatedTimeValue: undefined,
      calculatedTimeMode: undefined,
    });
  };

  handleChange = value => {
    this.setCalculatedValues(value);
    this.setState({ value });
    this.props.onChange(value);
  };

  renderModeData = value => {
    const { inputs } = this.props;
    return (
      <Data
        value={this.getModeValue(this.getCurrentValue(value))}
        {...inputs.mode}
      />
    );
  };

  renderOptions = () => {
    const {
      position,
      renderDate,
      dayDates,
      otherFormCalculatedTimeValue,
      tabId,
      formBatchCreate,
    } = this.props;
    const otherValue =
      position === NODE_CONSTANTS.POSITIONS.end
        ? otherFormCalculatedTimeValue
        : null;
    const showEmpty =
      position === NODE_CONSTANTS.POSITIONS.start && !formBatchCreate;
    return timeUtils.renderDayOptions(
      renderDate,
      dayDates,
      otherValue,
      showEmpty,
      tabId,
    );
  };

  render = () => {
    const { inputs } = this.props;
    const value = this.getValue();
    return (
      <React.Fragment>
        {this.renderModeData(value)}
        <Select
          value={value}
          options={this.renderOptions()}
          onChange={this.handleChange}
          {...inputs.tempDay}
        />
      </React.Fragment>
    );
  };
}

DaySelectInput.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,

  // parent
  value: PropTypes.string,
  inputs: PropTypes.object,
  mode: PropTypes.string,
  position: PropTypes.string,
  defaultMode: PropTypes.string,
  renderDate: PropTypes.func,
  otherValue: PropTypes.string,
  parentNodeId: PropTypes.number,
  dayDates: PropTypes.arrayOf(PropTypes.object),
  formBatchCreate: PropTypes.bool,
  otherFormCalculatedTimeValue: PropTypes.string,
  dayId: PropTypes.number,
  tabId: PropTypes.number,
  onChange: PropTypes.func,
};

DaySelectInput.defaultProps = {
  value: '',
  inputs: {},
  mode: null,
  position: null,
  defaultMode: null,
  renderDate: () => '',
  otherValue: '',
  parentNodeId: 0,
  dayDates: [],
  formBatchCreate: false,
  otherFormCalculatedTimeValue: null,
  dayId: null,
  tabId: null,
  onChange: () => {},
};

export default resaga(CONFIG)(DaySelectInput);
