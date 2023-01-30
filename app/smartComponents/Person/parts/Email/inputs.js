import React from 'react';
import { FormattedMessage as M } from 'react-intl';
import m from './messages';

export default {
  editable: {
    label: <M {...m.label} />,
    placeholder: 'Click to specify email address',
  },
};
