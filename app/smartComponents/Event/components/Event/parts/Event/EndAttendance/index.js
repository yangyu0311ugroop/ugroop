/**
 * Created by stephenkarpinskyj on 9/11/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { ForEachEventType } from 'smartComponents/Event/logics';
import ActivityEndAttendance from '../../Activity/EndAttendance';
import FlightEndAttendance from '../../Flight/EndAttendance';
import AccommodationEndAttendance from '../../Accommodation/EndAttendance';
import { CONFIG } from './config';

export class EndAttendance extends React.PureComponent {
  renderPart = Component => () => (
    <Component valuePath={EVENT_PATHS.endAttendance} {...this.props} />
  );

  render = () => {
    const { dataId, formType, formSubtype } = this.props;
    return (
      <ForEachEventType
        dataId={dataId}
        type={formType}
        subtype={formSubtype}
        renderActivity={this.renderPart(ActivityEndAttendance)}
        renderFlight={this.renderPart(FlightEndAttendance)}
        renderAccommodation={this.renderPart(AccommodationEndAttendance)}
      />
    );
  };
}

EndAttendance.propTypes = {
  // parent
  dataId: PropTypes.number,

  // resaga value
  formType: PropTypes.string,
  formSubtype: PropTypes.string,
};

EndAttendance.defaultProps = {
  dataId: null,

  formType: null,
  formSubtype: null,
};

export default resaga(CONFIG)(EndAttendance);
