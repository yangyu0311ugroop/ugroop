/**
 * Created by stephenkarpinskyj on 4/9/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import MOMENT_HELPERS from 'utils/helpers/moment';
import { Data } from 'ugcomponents/Inputs/index';
import inputs from './inputs';
import { CONFIG_TAB_ID, CONFIG_IDS, CONFIG } from './config';

export class BatchCreateDayRange extends React.PureComponent {
  calculateStartDay = () => {
    const { formCalculatedStartDayValue } = this.props;
    return formCalculatedStartDayValue;
  };

  calculateEndDay = () => {
    const {
      formCalculatedStartDayValue,
      formCalculatedEndDayValue,
    } = this.props;
    if (
      MOMENT_HELPERS.isBefore(
        formCalculatedEndDayValue,
        formCalculatedStartDayValue,
      )
    ) {
      return formCalculatedStartDayValue;
    }
    return formCalculatedEndDayValue;
  };

  calculateDayRange = () => {
    const { dayDates } = this.props;
    const startDay = this.calculateStartDay();
    const endDay = this.calculateEndDay();
    return dayDates.reduce((acc, { id, value }) => {
      if (MOMENT_HELPERS.isBetween(value, startDay, endDay, 'd', '[]')) {
        return [...acc, id];
      }
      return acc;
    }, []);
  };

  render = () => (
    <Data {...inputs.tempDayRange} value={this.calculateDayRange()} />
  );
}

BatchCreateDayRange.propTypes = {
  // resaga value
  dayDates: PropTypes.arrayOf(PropTypes.object),
  formCalculatedStartDayValue: PropTypes.string,
  formCalculatedEndDayValue: PropTypes.string,
};

BatchCreateDayRange.defaultProps = {
  dayDates: [],
  formCalculatedStartDayValue: null,
  formCalculatedEndDayValue: null,
};

export default compose(
  resaga(CONFIG_TAB_ID()),
  resaga(CONFIG_IDS()),
  resaga(CONFIG()),
)(BatchCreateDayRange);
