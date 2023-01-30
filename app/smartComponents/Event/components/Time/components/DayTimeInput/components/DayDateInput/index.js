/**
 * Created by stephenkarpinskyj on 4/9/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import { Select } from 'ugcomponents/Inputs';
import timeUtils from '../../../../utils';

export class DayDateInput extends React.PureComponent {
  getParentNodeId = () => {
    const { parentNodeId, dayId } = this.props;
    return parentNodeId || dayId;
  };

  getDefaultValue = () => {
    const { dayDates } = this.props;
    const parentNodeId = this.getParentNodeId();
    return timeUtils.getDate(parentNodeId, dayDates);
  };

  getValue = options => {
    const { value } = this.props;
    let v;
    if (value) {
      v = MOMENT_HELPERS.startOf(value, 'd').toISOString();
    } else {
      v = this.getDefaultValue();
    }
    if (!options.find(o => o.value === v) && options.length) {
      v = options[0].value;
    }
    return v;
  };

  renderOptions = () => {
    const { renderDate, dayDates } = this.props;
    return timeUtils.renderDayDateOptions(renderDate, dayDates);
  };

  render = () => {
    const { inputs } = this.props;
    const options = this.renderOptions();
    return (
      <Select
        value={this.getValue(options)}
        options={options}
        {...inputs.tempDay}
      />
    );
  };
}

DayDateInput.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,

  // parent
  value: PropTypes.string,
  inputs: PropTypes.object,
  mode: PropTypes.string,
  position: PropTypes.string,
  renderDate: PropTypes.func,
  parentNodeId: PropTypes.number,
  dayDates: PropTypes.arrayOf(PropTypes.object),
  dayId: PropTypes.number,
};

DayDateInput.defaultProps = {
  value: '',
  inputs: {},
  mode: null,
  position: null,
  renderDate: () => '',
  parentNodeId: 0,
  dayDates: [],
  dayId: null,
};

export default DayDateInput;
