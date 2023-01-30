import React from 'react';
import { FormattedMessage as M } from 'react-intl';

import m from './messages';

export default {
  base: {
    name: 'userRole',
  },
  field: {
    label: <M {...m.label} />,
  },
  editable: {
    label: <M {...m.editableLabel} />,
    placeholder: 'Click to add a cutom user role',
    inline: true,
  },
};
