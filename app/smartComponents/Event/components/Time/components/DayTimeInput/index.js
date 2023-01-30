/**
 * Created by stephenkarpinskyj on 4/9/18.
 */

import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { Data } from 'ugcomponents/Inputs';
import { NODE_CONSTANTS } from 'utils/constants/nodes';
import { NODE_HELPERS } from 'utils/helpers/nodes';
import DayDateInput from './components/DayDateInput';
import DayDurationInput from './components/DayDurationInput';
import DaySelectInput from './components/DaySelectInput';
import TimeInput from './components/TimeInput';
import { CONFIG, CONFIG_IDS, CONFIG_TAB_ID } from './config';

export class DayTimeInput extends React.PureComponent {
  // Verified with Stephen it's ok to get rid of this.
  // Will just keep it commented here in case something broken
  // componentDidMount = () => {
  // const { tabId, dayIds } = this.props;
  // NODE_API_HELPERS.getTimes({ id: tabId, ids: dayIds }, this.props);
  // };

  getDayInputComponent = () => {
    const { mode, position, formBatchCreate } = this.props;

    if (formBatchCreate) {
      return DaySelectInput;
    }

    if (NODE_HELPERS.isFixed(mode)) {
      return DayDateInput;
    }

    if (position === NODE_CONSTANTS.POSITIONS.start) {
      return DaySelectInput;
    }

    return DayDurationInput;
  };

  renderDay = () => {
    const Component = this.getDayInputComponent();
    return <Component {...this.props} />;
  };

  renderTime = () => <TimeInput {...this.props} />;

  renderModeData = () => {
    const { inputs, defaultMode, renderModeData } = this.props;
    return renderModeData && <Data value={defaultMode} {...inputs.mode} />;
  };

  render = () => {
    const { singleColumn } = this.props;

    if (singleColumn) {
      return (
        <GridContainer direction="column">
          {this.renderModeData()}
          <GridItem xs={12}>{this.renderDay()}</GridItem>
          <GridItem xs={12}>{this.renderTime()}</GridItem>
        </GridContainer>
      );
    }

    return (
      <GridContainer>
        {this.renderModeData()}
        <GridItem xs={12} sm>
          {this.renderDay()}
        </GridItem>
        <GridItem xs={12} sm={4}>
          {this.renderTime()}
        </GridItem>
      </GridContainer>
    );
  };
}

DayTimeInput.propTypes = {
  // parent
  value: PropTypes.string,
  inputs: PropTypes.object,
  mode: PropTypes.string,
  position: PropTypes.string,
  defaultMode: PropTypes.string,
  otherValue: PropTypes.string,
  renderModeData: PropTypes.bool,
  singleColumn: PropTypes.bool,

  // resaga value
  tabId: PropTypes.number,
  parentNodeId: PropTypes.number,
  dayIds: PropTypes.arrayOf(PropTypes.number),
  dayDates: PropTypes.arrayOf(PropTypes.object),
  formBatchCreate: PropTypes.bool,
};

DayTimeInput.defaultProps = {
  value: '',
  inputs: {},
  mode: null,
  position: null,
  defaultMode: null,
  otherValue: '',
  renderModeData: true,
  singleColumn: false,

  tabId: 0,
  parentNodeId: 0,
  dayIds: [],
  dayDates: [],
  formBatchCreate: false,
};

export default compose(
  resaga(CONFIG_TAB_ID),
  resaga(CONFIG_IDS),
  resaga(CONFIG),
)(DayTimeInput);
