import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import React from 'react';
import { FormattedMessage as M } from 'react-intl';

import m from './messages';

const end = EVENT_STORE_HELPERS.pathToEventInputName(
  EVENT_PATHS.transportationDetailEnd,
);

const name = EVENT_STORE_HELPERS.pathToEventInputName(
  EVENT_PATHS.transportationDetailEndName,
);

const placeId = EVENT_STORE_HELPERS.pathToEventInputName(
  EVENT_PATHS.transportationDetailEndPlaceId,
);

const icon = EVENT_STORE_HELPERS.pathToEventInputName(
  EVENT_PATHS.transportationDetailEndIcon,
);

const timeZoneId = NODE_STORE_HELPERS.pathToNodeInputName(
  NODE_PATHS.endTimeZoneId,
);

const label = <M {...m.label} />;
const vehicleHireLabel = <M {...m.vehicleHireLabel} />;

export const TRANSPORTATION_END_LOC_INPUTS = {
  end,
  name,
  placeId,
  icon,
  timeZoneId,
  vehicleHireLabel,
  field: {
    locationKey: name,
    locationLabel: null,
    placeIdInputs: {
      name: placeId,
    },
    iconInputs: {
      name: icon,
    },
    timeZoneIdInputs: {
      name: timeZoneId,
    },
  },
  editable: {
    name,
    label,
    placeholder: 'Click here to specify the location',
  },
  editableTextProps: {
    locationKey: name,
    editing: true,
    placeIdInputs: {
      name: placeId,
    },
    iconInputs: {
      name: icon,
    },
    timeZoneIdInputs: {
      name: timeZoneId,
    },
  },
};
