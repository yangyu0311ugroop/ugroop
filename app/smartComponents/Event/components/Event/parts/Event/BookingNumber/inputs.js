/**
 * Created by stephenkarpinskyj on 15/11/18.
 */

import React from 'react';
import { FormattedMessage as M } from 'react-intl';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import m from './messages';

export default {
  bookingNumber: {
    name: EVENT_STORE_HELPERS.pathToEventInputName(EVENT_PATHS.bookingNumber),
    label: <M {...m.bookingNumberLabel} />,
  },
  bookingNumberEditable: {
    placeholder: 'Click to specify booking number',
  },
};
