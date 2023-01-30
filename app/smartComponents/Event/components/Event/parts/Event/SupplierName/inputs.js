/**
 * Created by stephenkarpinskyj on 15/11/18.
 */

import React from 'react';
import { FormattedMessage as M } from 'react-intl';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import m from './messages';

export default {
  supplierName: {
    name: EVENT_STORE_HELPERS.pathToEventInputName(EVENT_PATHS.supplierName),
    label: <M {...m.supplierNameLabel} />,
  },
  supplierNameEditable: {
    placeholder: 'Click to specify who this event is booked with',
  },
};
