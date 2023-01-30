/**
 * Created by stephenkarpinskyj on 31/8/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { NODE_CONSTANTS } from 'utils/constants/nodes';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { ForEachEventType } from 'smartComponents/Event/logics';
import ActivityStartTime from '../../Activity/StartTime';
import AccommodationStartTime from '../../Accommodation/StartTime';
import FlightStartTime from '../../Flight/StartTime';
import TransportationStartTime from '../../Transportation/StartTime';
import inputs from './inputs';
import { CONFIG } from './config';

export class StartTime extends React.PureComponent {
  renderPart = Component => () => (
    <Component
      valuePath={NODE_PATHS.startTimeValue}
      modePath={NODE_PATHS.startTimeMode}
      timeZoneIdPath={NODE_PATHS.startTimeZoneId}
      otherValuePath={NODE_PATHS.endTimeValue}
      calculatedTimeValuePath={NODE_PATHS.calculatedStartTimeValue}
      calculatedTimeModePath={NODE_PATHS.calculatedStartTimeMode}
      otherCalculatedTimeValuePath={NODE_PATHS.calculatedEndTimeValue}
      otherCalculatedTimeModePath={NODE_PATHS.calculatedEndTimeMode}
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
        renderActivity={this.renderPart(ActivityStartTime)}
        renderAccommodation={this.renderPart(AccommodationStartTime)}
        renderFlight={this.renderPart(FlightStartTime)}
        renderTransportation={this.renderPart(TransportationStartTime)}
      />
    );
  };
}

StartTime.propTypes = {
  // parent
  dataId: PropTypes.number,
  position: PropTypes.string,

  // resaga value
  formType: PropTypes.string,
  formSubtype: PropTypes.string,
};

StartTime.defaultProps = {
  position: NODE_CONSTANTS.POSITIONS.start,

  formType: null,
  formSubtype: null,
};

export default resaga(CONFIG())(StartTime);
