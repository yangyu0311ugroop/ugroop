import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import {
  CONFIG_1,
  CONFIG_2,
  CONFIG_3,
  CONFIG_4,
  CONFIG_5,
} from 'smartComponents/Node/logics/FlightIds/config';

/**
 * Selects sorted flight node id's of flights.
 *
 * Note: either for specific flight booking or all flights on a flight booking's template.
 */
export class FlightIds extends React.PureComponent {
  render = () => {
    const { children, flightIds } = this.props;
    return children(flightIds);
  };
}

FlightIds.propTypes = {
  // parent
  children: PropTypes.func.isRequired,

  // parent for hoc (note: defaultProps won't be passed to hoc)
  flightBookingDataId: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
  allFlights: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types

  // resaga value
  flightIds: PropTypes.array,
};

FlightIds.defaultProps = {
  flightIds: [],
};

export default compose(
  resaga(CONFIG_1),
  resaga(CONFIG_2),
  resaga(CONFIG_3),
  resaga(CONFIG_4),
  resaga(CONFIG_5),
)(FlightIds);
