/**
 * Created by stephenkarpinskyj on 9/11/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { ForEachEventType } from 'smartComponents/Event/logics';
import ActivityStartAttendance from '../../Activity/StartAttendance';
import FlightStartAttendance from '../../Flight/StartAttendance';
import AccommodationStartAttendance from '../../Accommodation/StartAttendance';
import { CONFIG } from './config';

export class StartAttendance extends React.PureComponent {
  renderPart = Component => () => (
    <Component valuePath={EVENT_PATHS.startAttendance} {...this.props} />
  );

  render = () => {
    const { dataId, formType, formSubtype } = this.props;
    return (
      <ForEachEventType
        dataId={dataId}
        type={formType}
        subtype={formSubtype}
        renderActivity={this.renderPart(ActivityStartAttendance)}
        renderFlight={this.renderPart(FlightStartAttendance)}
        renderAccommodation={this.renderPart(AccommodationStartAttendance)}
      />
    );
  };
}

StartAttendance.propTypes = {
  // parent
  dataId: PropTypes.number,

  // resaga value
  formType: PropTypes.string,
  formSubtype: PropTypes.string,
};

StartAttendance.defaultProps = {
  dataId: null,

  formType: null,
  formSubtype: null,
};

export default resaga(CONFIG)(StartAttendance);
