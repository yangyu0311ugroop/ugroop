/**
 * Created by stephenkarpinskyj on 5/8/18.
 */

import React from 'react';
import { FormattedMessage as M } from 'react-intl';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import m from './messages';

export default {
  gate: {
    name: EVENT_STORE_HELPERS.pathToEventInputName(EVENT_PATHS.gate),
    label: <M {...m.gateLabel} />,
  },
  gateEditable: {
    placeholder: 'Click to specify gate',
    inline: true,
  },
};
