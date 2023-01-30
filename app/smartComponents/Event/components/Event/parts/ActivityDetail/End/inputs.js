import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import React from 'react';
import { FormattedMessage as M } from 'react-intl';

import m from './messages';

const end = EVENT_STORE_HELPERS.pathToEventInputName(
  EVENT_PATHS.activityDetailEnd,
);

const name = EVENT_STORE_HELPERS.pathToEventInputName(
  EVENT_PATHS.activityDetailEndName,
);

const placeId = EVENT_STORE_HELPERS.pathToEventInputName(
  EVENT_PATHS.activityDetailEndPlaceId,
);

const icon = EVENT_STORE_HELPERS.pathToEventInputName(
  EVENT_PATHS.activityDetailEndIcon,
);

const timeZoneId = NODE_STORE_HELPERS.pathToNodeInputName(
  NODE_PATHS.endTimeZoneId,
);

const locationLabel = <M {...m.label} />;
const label = locationLabel;

export const ACTIVITY_DETAIL_LOCATION_END = {
  end,
  name,
  placeId,
  icon,
  timeZoneId,
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
