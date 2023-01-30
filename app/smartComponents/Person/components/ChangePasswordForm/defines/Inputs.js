/**
 * Created by quando on 6/3/17.
 */

import React from 'react';
import { FormattedMessage as M } from 'react-intl';
import m from './messages';

export const PASSWORD = {
  id: 'password',
  name: 'password',
  label: <M {...m.passwordLabel} />,
  validText: '',
  validations: {
    matchRegexp: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
  },
  validationErrors: {
    matchRegexp: '',
  },
  required: true,
  passwordHelpBlock: true,
};

export const MATCH_PASSWORD = {
  id: 'confirmedPassword',
  name: 'confirmedPassword',
  label: <M {...m.confirmedPasswordLabel} />,
  required: true,
  passwordHelpBlock: true,
};
