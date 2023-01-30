/**
 * Created by stephenkarpinskyj on 31/8/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { NODE_CONSTANTS } from 'utils/constants/nodes';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { ForEachEventType } from 'smartComponents/Event/logics';
import ActivityEndTime from '../../Activity/EndTime';
import AccommodationEndTime from '../../Accommodation/EndTime';
import FlightEndTime from '../../Flight/EndTime';
import TransportationEndTime from '../../Transportation/EndTime';
import inputs from './inputs';
import { CONFIG } from './config';

export class EndTime extends React.PureComponent {
  renderPart = Component => () => (
    <Component
      valuePath={NODE_PATHS.endTimeValue}
      modePath={NODE_PATHS.endTimeMode}
      timeZoneIdPath={NODE_PATHS.endTimeZoneId}
      otherValuePath={NODE_PATHS.startTimeValue}
      calculatedTimeValuePath={NODE_PATHS.calculatedEndTimeValue}
      calculatedTimeModePath={NODE_PATHS.calculatedEndTimeMode}
      otherCalculatedTimeValuePath={NODE_PATHS.calculatedStartTimeValue}
      otherCalculatedTimeModePath={NODE_PATHS.calculatedStartTimeMode}
      inputs={inputs}
      {...this.props}
    />
  );

  render = () => {
    const { dataId, formType, formSubtype } = this.props;
    return (
      <ForEachEventType
        dataId={dataId}
        type={formType}
        subtype={formSubtype}
        renderActivity={this.renderPart(ActivityEndTime)}
        renderAccommodation={this.renderPart(AccommodationEndTime)}
        renderFlight={this.renderPart(FlightEndTime)}
        renderTransportation={this.renderPart(TransportationEndTime)}
      />
    );
  };
}

EndTime.propTypes = {
  // parent
  dataId: PropTypes.number,
  position: PropTypes.string,

  // resaga value
  formType: PropTypes.string,
  formSubtype: PropTypes.string,
};

EndTime.defaultProps = {
  dataId: null,
  position: NODE_CONSTANTS.POSITIONS.end,

  formType: null,
  formSubtype: null,
};

export default resaga(CONFIG())(EndTime);
