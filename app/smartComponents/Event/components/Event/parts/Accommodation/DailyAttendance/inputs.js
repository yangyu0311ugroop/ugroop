/**
 * Created by stephenkarpinskyj on 9/11/18.
 */

import React from 'react';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import { FormattedMessage as M } from 'react-intl';
import m from './messages';

export default {
  dailyAttendance: {
    name: EVENT_STORE_HELPERS.pathToEventInputName(EVENT_PATHS.dailyAttendance),
    label: <M {...m.dailyAttendanceLabel} />,
  },
};
