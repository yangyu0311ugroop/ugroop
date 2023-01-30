/**
 * Created by stephenkarpinskyj on 9/11/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { ForEachEventType } from 'smartComponents/Event/logics';
import AccommodationDailyAttendance from '../../Accommodation/DailyAttendance';
import { CONFIG } from './config';

export class DailyAttendance extends React.PureComponent {
  renderPart = Component => () => (
    <Component valuePath={EVENT_PATHS.dailyAttendance} {...this.props} />
  );

  render = () => {
    const { dataId, formType, formSubtype } = this.props;
    return (
      <ForEachEventType
        dataId={dataId}
        type={formType}
        subtype={formSubtype}
        renderAccommodation={this.renderPart(AccommodationDailyAttendance)}
      />
    );
  };
}

DailyAttendance.propTypes = {
  // parent
  dataId: PropTypes.number,

  // resaga value
  formType: PropTypes.string,
  formSubtype: PropTypes.string,
};

DailyAttendance.defaultProps = {
  dataId: null,

  formType: null,
  formSubtype: null,
};

export default resaga(CONFIG)(DailyAttendance);
