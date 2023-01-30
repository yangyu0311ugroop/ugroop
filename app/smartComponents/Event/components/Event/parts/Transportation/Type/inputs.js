import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import React from 'react';
import { FormattedMessage as M } from 'react-intl';

import m from './messages';

const name = EVENT_STORE_HELPERS.pathToEventInputName(
  EVENT_PATHS.transportationType,
);

const locationLabel = <M {...m.label} />;
const label = locationLabel;

export const TRANSPORTATION_TYPE_INPUTS = {
  field: {
    name,
    label,
  },
  editable: {
    name,
    label,
    placeholder: 'Click here to specify the location',
  },
};
