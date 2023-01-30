/**
 * Created by quando on 21/3/17.
 */

import React from 'react';
import { FormattedMessage as M } from 'react-intl';
import m from './messages';

export const EMAIL = {
  id: 'username',
  name: 'username',
  type: 'email',
  label: <M {...m.emailLabel} />,
  placeholder: 'Enter email',
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
  placeholder: 'Enter password',
  required: true,
};
