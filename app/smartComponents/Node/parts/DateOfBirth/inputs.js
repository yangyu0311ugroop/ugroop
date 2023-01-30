import React from 'react';
import { FormattedMessage as M } from 'react-intl';
import m from './messages';

export default {
  textField: {
    label: <M {...m.label} />,
  },
  editable: {
    label: <M {...m.label} />,
    placeholder: 'Click to specify date of birth',
  },
  editableInput: {
    placeholder: 'New date of birth?',
  },
};
