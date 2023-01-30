/**
 * Created by quando on 21/3/17.
 */
import React from 'react';
import { FormattedMessage as M } from 'react-intl';
import m from './messages';

export const VALID_BUTTON = {
  text: <M {...m.validButton} />,
  icon: '',
  class: 'blue-madison',
  textClass: '',
  type: 'submit',
};

export const SENDING_BUTTON = {
  text: <M {...m.sendingButton} />,
  icon: '',
  class: 'blue-madison',
  textClass: 'blink-spin',
  type: 'button',
};

export const REQUIRED_BUTTON = {
  text: <M {...m.validButton} />,
  icon: '',
  class: 'grey',
  textClass: '',
  type: 'button',
  disabled: true,
};

export const INVALID_BUTTON = {
  text: <M {...m.validButton} />,
  icon: '',
  class: 'red-sunglo',
  textClass: '',
  type: 'button',
  disabled: true,
};

export const SUCCESS_BUTTON = {
  text: <M {...m.successButton} />,
};
