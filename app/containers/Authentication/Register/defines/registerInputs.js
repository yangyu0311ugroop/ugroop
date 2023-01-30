/**
 * Created by quando on 6/3/17.
 */

import React from 'react';
import { FormattedMessage as M } from 'react-intl';
import m from './messages';

export const ORG_NAME = {
  id: 'orgName',
  name: 'orgName',
  label: <M {...m.nameLabel} />,
  type: 'text',
  validations: {
    minLength: 6,
    maxLength: 50,
  },
  validationErrors: {
    minLength: <M {...m.orgNameMinLength} />,
    maxLength: <M {...m.orgNameMaxLength} />,
  },
  required: true,
};

export const ORG_ADDRESS = {
  id: 'orgAddress',
  name: 'orgAddress',
  type: 'text',
  label: <M {...m.addLabel} />,
  capitalize: true,
};

export const FIRST_NAME = {
  id: 'firstName',
  name: 'firstName',
  type: 'text',
  label: <M {...m.orgFirstNameLabel} />,
  validations: 'isWords,minLength:2,maxLength:50',
  validationErrors: {
    isWords: <M {...m.nameIsWords} />,
    minLength: <M {...m.nameMinLength} />,
    maxLength: <M {...m.nameMaxLength} />,
  },
  required: true,
  capitalize: true,
};

export const LAST_NAME = {
  id: 'lastName',
  name: 'lastName',
  type: 'text',
  label: <M {...m.lastLabel} />,
  validations: 'isWords,minLength:2,maxLength:50',
  validationErrors: {
    isWords: <M {...m.nameIsWords} />,
    minLength: <M {...m.nameMinLength} />,
    maxLength: <M {...m.nameMaxLength} />,
  },
  required: true,
  capitalize: true,
};

export const EMAIL = {
  id: 'email',
  name: 'email',
  type: 'email',
  helperText: 'This will also be your username.',
  label: <M {...m.emailLabel} />,
  validations: 'isEmail',
  validationErrors: {
    isEmail: <M {...m.emailIsEmail} />,
  },
  required: true,
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
