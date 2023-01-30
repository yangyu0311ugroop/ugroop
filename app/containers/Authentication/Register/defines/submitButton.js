/**
 * Created by quando on 5/3/17.
 */
import React from 'react';
import { FormattedMessage as M } from 'react-intl';
import m from './messages';

export const REQUIRED_BUTTON = {
  text: <M {...m.validButton} />,
  icon: '',
  class: 'grey',
  textClass: '',
  type: 'button',
  disabled: true,
  status: 'required',
};

export const VALID_BUTTON = {
  text: <M {...m.validButton} />,
  icon: '',
  class: 'yellow-casablanca',
  textClass: '',
  type: 'submit',
  status: 'valid',
};

export const INVALID_BUTTON = {
  text: <M {...m.invalidButton} />,
  icon: 'ban fa-fw',
  class: 'grey',
  textClass: '',
  type: 'button',
  disabled: true,
  status: 'invalid',
};

export const SUCCESS_BUTTON = {
  text: <M {...m.successButton} />,
  icon: 'check fa-fw',
  class: 'yellow-casablanca',
  textClass: '',
  type: 'button',
  status: 'success',
};

export const SENDING_BUTTON = {
  text: <M {...m.sendingButton} />,
  icon: '',
  class: 'blue-madison',
  textClass: 'blink-spin',
  type: 'button',
  status: 'sending',
};

export const TIMED_OUT_BUTTON = {
  text: <M {...m.timedOutButton} />,
  icon: 'warning fa-fw',
  class: 'grey-mint',
  textClass: '',
  type: 'submit',
};

export const PASSWORD_BUTTON = {
  icon: 'eye',
  type: 'password',
};

export const PASSWORD_BUTTON_SHOW = {
  icon: 'eye-slash',
  type: 'text',
};
