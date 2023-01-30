import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import FText from 'components/Inputs/TextField/components/FilledInputs/components/FText';
import { withStyles } from 'components/material-ui';
import styles from 'containers/Portal/components/AddEvent/components/EditEventCard/components/EditEventForm/styles';
import AmountsForm from 'containers/Portal/components/AddEvent/components/EventForm/parts/Reservation/components/AmountsForm';
import {
  EVENT_PATHS,
  FLIGHT_BOOKING_PATHS,
} from 'datastore/eventStore/constants';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { Data } from 'ugcomponents/Inputs';
import { CONFIG } from './config';

export class FlightBookingSubForm extends PureComponent {
  render = () => {
    const { data, id, templateId } = this.props;

    return (
      <GridContainer direction="column">
        <Data currentValue={data.id} name="flightBookingDataId" />
        <Data
          currentValue={id}
          name={EVENT_STORE_HELPERS.pathToEventInputName(
            EVENT_PATHS.flightBooking,
          )}
        />
        <GridItem>
          <FText
            name={EVENT_STORE_HELPERS.pathToFlightBookingInputName(
              FLIGHT_BOOKING_PATHS.name,
            )}
            label="Itinerary name"
            placeholder="Enter itinerary name"
            value={data.name}
          />
        </GridItem>
        <GridItem>
          <FText
            name={EVENT_STORE_HELPERS.pathToFlightBookingInputName(
              FLIGHT_BOOKING_PATHS.number,
            )}
            label="Booking number"
            placeholder="Enter booking number"
            value={data.bookingNumber}
          />
        </GridItem>
        <GridItem>
          <FText
            type="number"
            name={EVENT_STORE_HELPERS.pathToFlightBookingInputName(
              FLIGHT_BOOKING_PATHS.passengerCount,
            )}
            label="Passenger count"
            placeholder="Enter passenger count"
            value={data.passengerCount}
          />
        </GridItem>
        <GridItem>
          <FText
            name={EVENT_STORE_HELPERS.pathToFlightBookingInputName(
              FLIGHT_BOOKING_PATHS.supplierName,
            )}
            label="Booking with"
            placeholder="Enter booking with"
            value={data.supplier}
          />
        </GridItem>

        <GridItem>
          <AmountsForm
            popper
            flightBooking
            templateId={templateId}
            data={data}
          />
        </GridItem>
      </GridContainer>
    );
  };
}

FlightBookingSubForm.propTypes = {
  // hoc props
  // classes: PropTypes.object.isRequired,

  // parent props
  data: PropTypes.object,
  id: PropTypes.number,
  templateId: PropTypes.number,

  // resaga props
};

FlightBookingSubForm.defaultProps = {
  data: {},
};

export default compose(
  withStyles(styles, { name: 'FlightBookingSubForm' }),
  resaga(CONFIG),
)(FlightBookingSubForm);
