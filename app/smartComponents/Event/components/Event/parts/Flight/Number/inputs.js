/**
 * Created by stephenkarpinskyj on 5/8/18.
 */

import React from 'react';
import { FormattedMessage as M } from 'react-intl';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import m from './messages';

export default {
  number: {
    name: EVENT_STORE_HELPERS.pathToEventInputName(EVENT_PATHS.flightNumber),
    label: <M {...m.numberLabel} />,
  },
  numberEditable: {
    placeholder: 'Click to specify flight number',
  },
};
