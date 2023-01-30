import React from 'react';
import { FormattedMessage as M } from 'react-intl';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import m from './messages';

export default {
  travelClass: {
    name: EVENT_STORE_HELPERS.pathToEventInputName(
      EVENT_PATHS.flightTravelClass,
    ),
    label: <M {...m.travelClassLabel} />,
  },
  travelClassEditable: {
    placeholder: 'Click to specify',
  },
};
