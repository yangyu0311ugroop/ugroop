/**
 * Created by stephenkarpinskyj on 7/9/18.
 */

import React from 'react';
import { FormattedMessage as M } from 'react-intl';
import { FLIGHT_BOOKING_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import m from './messages';

export default {
  supplierName: {
    name: EVENT_STORE_HELPERS.pathToFlightBookingInputName(
      FLIGHT_BOOKING_PATHS.supplierName,
    ),
    label: <M {...m.supplierNameLabel} />,
  },
  supplierNameEditable: {
    placeholder: 'Click to specify who this flight is booked with',
  },
};
