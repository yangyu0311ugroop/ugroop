import React from 'react';
import { FormattedMessage as M } from 'react-intl';
// import { MOMENT_HELPERS } from 'utils/helpers/moment';
import m from './messages';

export default {
  mode: {},
  value: {
    placeholder: 'Enter note',
  },
  valueDate: {
    placeholder: 'Enter date',
    // minDate: MOMENT_HELPERS.getDateToday(),
  },
  editable: {
    label: <M {...m.label} />,
    placeholder: 'Click to specify insurance policy',
  },
};
