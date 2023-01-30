/**
 * Created by stephenkarpinskyj on 5/8/18.
 */

import React from 'react';
import { FormattedMessage as M } from 'react-intl';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import m from './messages';

export default {
  airport: {
    name: EVENT_STORE_HELPERS.pathToEventInputName(
      EVENT_PATHS.startAirportName,
    ),
    label: <M {...m.airportLabel} />,
    InputLabelProps: { shrink: true },
    cityNameProps: {
      name: EVENT_STORE_HELPERS.pathToEventInputName(EVENT_PATHS.startCityName),
    },
    iataCodeProps: {
      name: EVENT_STORE_HELPERS.pathToEventInputName(EVENT_PATHS.startIataCode),
    },
    timeZoneIdProps: {
      name: NODE_STORE_HELPERS.pathToNodeInputName(NODE_PATHS.startTimeZoneId),
    },
  },
};
