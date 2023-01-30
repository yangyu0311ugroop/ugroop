import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import React from 'react';
import { FormattedMessage as M } from 'react-intl';

import m from './messages';

const start = EVENT_STORE_HELPERS.pathToEventInputName(
  EVENT_PATHS.transportationDetailStart,
);

const name = EVENT_STORE_HELPERS.pathToEventInputName(
  EVENT_PATHS.transportationDetailStartName,
);

const placeId = EVENT_STORE_HELPERS.pathToEventInputName(
  EVENT_PATHS.transportationDetailStartPlaceId,
);

const icon = EVENT_STORE_HELPERS.pathToEventInputName(
  EVENT_PATHS.transportationDetailStartIcon,
);

const timeZoneId = NODE_STORE_HELPERS.pathToNodeInputName(
  NODE_PATHS.startTimeZoneId,
);

const locationLabel = <M {...m.label} />;
const label = locationLabel;

const vehicleHireLabel = <M {...m.vehicleHireLabel} />;

export const TRANSPORTATION_START_LOC_INPUTS = {
  start,
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
