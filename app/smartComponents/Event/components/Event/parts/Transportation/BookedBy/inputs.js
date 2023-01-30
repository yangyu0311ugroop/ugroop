import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import React from 'react';
import { FormattedMessage as M } from 'react-intl';
import m from './messages';

const name = EVENT_STORE_HELPERS.pathToEventInputName(
  EVENT_PATHS.transportationDetailBookerName,
);

export const TRANSPORTATION_BOOKEDBY_INPUTS = {
  bookedBy: {
    name,
    label: <M {...m.label} />,
  },
  bookedByEditable: {
    name,
    label: <M {...m.label} />,
  },
};
