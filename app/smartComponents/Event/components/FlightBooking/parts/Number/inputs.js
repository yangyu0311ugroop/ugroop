/**
 * Created by stephenkarpinskyj on 7/9/18.
 */

import React from 'react';
import { FormattedMessage as M } from 'react-intl';
import { FLIGHT_BOOKING_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import m from './messages';

const name = EVENT_STORE_HELPERS.pathToFlightBookingInputName(
  FLIGHT_BOOKING_PATHS.number,
);

export default {
  number: {
    name,
    label: <M {...m.numberLabel} />,
  },
  numberEditable: {
    name,
    placeholder: 'Booking Reference',
  },
};
