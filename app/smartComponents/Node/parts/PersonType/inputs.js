import React from 'react';
import { FormattedMessage as M } from 'react-intl';
import helpers from './helpers';
import m from './messages';

export default {
  base: {
    label: <M {...m.label} />,
    options: helpers.makeOptions(),
  },
  editable: {
    placeholder: 'Click to specify participant type',
  },
};
