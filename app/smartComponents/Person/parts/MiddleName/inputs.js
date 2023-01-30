import React from 'react';
import { FormattedMessage as M } from 'react-intl';
import { Name } from 'smartComponents/Inputs';
import m from './messages';

export default {
  textField: {
    name: 'middleName',
    label: <M {...m.label} />,
  },
  editable: {
    label: <M {...m.label} />,
    placeholder: 'Click to specify middle name',
    TextComponent: Name,
  },
};
