/**
 * Created by stephenkarpinskyj on 31/8/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { EVENT_CONSTANTS } from 'utils/constants/events';
import { CONFIG } from './config';

/**
 * Specify type/subtype via props, or resaga via dataId prop.
 */
export class ForEachEventType extends React.PureComponent {
  getType = () => {
    const { dataId, type, storeType } = this.props;
    return dataId ? storeType : type;
  };

  getSubtype = () => {
    const { dataId, subtype, storeSubtype } = this.props;
    return dataId ? storeSubtype : subtype;
  };

  renderFirst = (...renderFuncs) => {
    for (let i = 0; i < renderFuncs.length; i += 1) {
      const func = renderFuncs[i];
      if (func) return func();
    }
    return this.props.renderEvent();
  };

  render = () => {
    const {
      renderActivity,
      renderFlight,
      renderAccommodation,
      renderTransportation,
    } = this.props;

    switch (this.getType()) {
      case EVENT_CONSTANTS.EVENTS.ACTIVITY.type:
        return this.renderFirst(renderActivity);

      case EVENT_CONSTANTS.EVENTS.ACCOMMODATION.type:
        return this.renderFirst(renderAccommodation);

      case EVENT_CONSTANTS.EVENTS.TRANSPORTATION.type:
        switch (this.getSubtype()) {
          case EVENT_CONSTANTS.TRANSPORTATIONS.FLIGHT.type:
            return this.renderFirst(renderFlight);
          case EVENT_CONSTANTS.TRANSPORTATIONS.VEHICLE_HIRE.type:
          case EVENT_CONSTANTS.TRANSPORTATIONS.COACH.type:
          case EVENT_CONSTANTS.TRANSPORTATIONS.BUS.type:
          case EVENT_CONSTANTS.TRANSPORTATIONS.BOAT.type:
          case EVENT_CONSTANTS.TRANSPORTATIONS.FERRY.type:
          case EVENT_CONSTANTS.TRANSPORTATIONS.TRAM.type:
          case EVENT_CONSTANTS.TRANSPORTATIONS.TRAIN.type:
          case EVENT_CONSTANTS.TRANSPORTATIONS.SHIP.type:
          case EVENT_CONSTANTS.TRANSPORTATIONS.CAR.type:
          case EVENT_CONSTANTS.TRANSPORTATIONS.CAB.type:
          case EVENT_CONSTANTS.TRANSPORTATIONS.TAXI.type:
          case EVENT_CONSTANTS.TRANSPORTATIONS.RIDESHARE.type:
          case EVENT_CONSTANTS.TRANSPORTATIONS.BICYCLE.type:
          case EVENT_CONSTANTS.TRANSPORTATIONS.WALK.type:
            return this.renderFirst(renderTransportation);

          default:
            return this.renderFirst();
        }

      default:
        return this.renderFirst();
    }
  };
}

ForEachEventType.propTypes = {
  // parent
  dataId: PropTypes.number,
  type: PropTypes.string,
  subtype: PropTypes.string,
  renderEvent: PropTypes.func,
  renderActivity: PropTypes.func,
  renderFlight: PropTypes.func,
  renderAccommodation: PropTypes.func,
  renderTransportation: PropTypes.func,

  // resaga value
  storeType: PropTypes.string,
  storeSubtype: PropTypes.string,
};

ForEachEventType.defaultProps = {
  dataId: null,
  type: null,
  subtype: null,
  renderEvent: () => null,
};

export default resaga(CONFIG)(ForEachEventType);
