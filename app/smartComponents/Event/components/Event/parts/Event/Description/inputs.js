/**
 * Created by jap on 24/1/2020.
 */

import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import { FormattedMessage as M } from 'react-intl';
import React from 'react';
import m from './messages';

export default {
  description: {
    name: EVENT_STORE_HELPERS.pathToEventInputName(EVENT_PATHS.description),
    label: <M {...m.label} />,
    placeholder: 'Click to add description',
  },
};
