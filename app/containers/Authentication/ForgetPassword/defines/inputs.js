/**
 * Created by quando on 21/3/17.
 */

import React from 'react';
import { FormattedMessage as M } from 'react-intl';
import m from './messages';

export const EMAIL = {
  id: 'email',
  name: 'email',
  type: 'email',
  validations: 'isEmail',
  validationErrors: {
    isEmail: <M {...m.emailIsEmail} />,
  },
  required: true,
  autoFocus: true,
};

export const PASSWORD = {
  id: 'password',
  name: 'password',
  label: <M {...m.passwordLabel} />,
  helperText:
    'Use minimum 8 characters including at least 1 numeral, 1 lowercase and 1 uppercase letter.',
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

export const ResetPasswordCode = {
  id: 'code',
  name: 'code',
  label: <M {...m.verificationCode} />,
  helperText: '',
  validText: '',
  required: true,
  autoFocus: true,
};
