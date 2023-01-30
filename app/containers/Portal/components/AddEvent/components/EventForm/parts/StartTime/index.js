import { FilledVTextField } from 'components/Inputs/TextField/components/FilledInputs';
import { withStyles } from 'components/material-ui';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import startInputs from 'smartComponents/Event/components/Event/parts/Event/StartTime/inputs';
import { Time } from 'smartComponents/Inputs';
import { EVENT_DATA_HELPERS } from 'smartComponents/Node/types/Event/dataHelpers';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import { NODE_HELPERS } from 'utils/helpers/nodes';
import { CONFIG } from './config';
import styles from './styles';

export const defaultValue = props => {
  const { node } = props;

  const startTimeValue = EVENT_VIEW_HELPERS.startTimeValue(node);
  const startTimeMode = EVENT_VIEW_HELPERS.startTimeMode(node);

  if (startTimeValue) {
    if (!NODE_HELPERS.withTime(startTimeMode)) return null;

    const duration = moment.duration(startTimeValue);

    return moment
      .utc()
      .startOf('day')
      .add(duration);
  }

  const tempStartTime = EVENT_VIEW_HELPERS.tempStartTime(node);

  if (tempStartTime) {
    return moment.utc(tempStartTime, 'HH:mm');
  }

  return null;
};

export class StartTime extends PureComponent {
  state = {
    value: defaultValue(this.props),
  };

  handleChange = value => {
    const { value: currentValue } = this.state;

    const newValue = EVENT_DATA_HELPERS.checkTimeChange(value, currentValue);

    // do nothing
    if (newValue === undefined) {
      return null;
    }

    return this.setState({ value: newValue });
  };

  render = () => {
    const { label, placeholder } = this.props;
    const { value } = this.state;

    return (
      <Time
        {...startInputs.tempTime}
        value={value}
        onChange={this.handleChange}
        textComponent={FilledVTextField}
        label={label}
        placeholder={placeholder}
      />
    );
  };
}

StartTime.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  label: PropTypes.string,
  placeholder: PropTypes.string,

  // resaga props
};

StartTime.defaultProps = {
  label: 'Start time',
  placeholder: 'Enter start time',
};

export default compose(
  withStyles(styles, { name: 'StartTime' }),
  resaga(CONFIG),
)(StartTime);
