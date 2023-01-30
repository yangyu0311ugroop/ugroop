import React from 'react';
import { FormattedMessage as M } from 'react-intl';
import m from './messages';

export default {
  base: {
    label: <M {...m.label} />,
  },
  required: {
    required: true,
    label: <M {...m.labelRequired} />,
  },
  extended: {
    label: <M {...m.labelExtended} />,
  },
  editable: {
    placeholder: 'Click to specify first name',
  },
};
