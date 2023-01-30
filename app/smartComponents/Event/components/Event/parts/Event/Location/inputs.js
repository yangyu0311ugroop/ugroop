/**
 * Created by stephenkarpinskyj on 10/9/18.
 */

import React from 'react';
import { FormattedMessage as M } from 'react-intl';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import m from './messages';

export default {
  location: {
    name: EVENT_STORE_HELPERS.pathToEventInputName(EVENT_PATHS.locationName),
    // TODO: Make location input use "name" prop like everyone else
    locationKey: EVENT_STORE_HELPERS.pathToEventInputName(
      EVENT_PATHS.locationName,
    ),
    iconInputs: {
      name: EVENT_STORE_HELPERS.pathToEventInputName(EVENT_PATHS.locationIcon),
    },
    placeIdInputs: {
      name: EVENT_STORE_HELPERS.pathToEventInputName(EVENT_PATHS.placeId),
    },
    timeZoneIdInputs: {
      name: NODE_STORE_HELPERS.pathToNodeInputName(NODE_PATHS.startTimeZoneId),
    },
    textFieldProps: {
      autoComplete: 'off',
    },
  },
  fieldLocation: {
    editingWithViewLink: true,
  },
  editableLocation: {
    label: <M {...m.locationLabel} />,
    editingWithViewLink: true,
    textFieldProps: {
      autoFocus: true,
      autoComplete: 'off',
    },
    placeholder: 'Add a location',
  },
};
