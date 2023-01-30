/**
 * Created by stephenkarpinskyj on 15/11/18.
 */

import React from 'react';
import { FormattedMessage as M } from 'react-intl';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import m from './messages';

export default {
  supplierPhone: {
    name: EVENT_STORE_HELPERS.pathToEventInputName(EVENT_PATHS.supplierPhone),
  },
  supplierPhoneField: {
    label: <M {...m.supplierPhoneLabel} />,
  },
  supplierPhoneEditable: {
    placeholder: "Click to specify booking supplier's phone number",
    inline: true,
    resetValue: '',
  },
};
