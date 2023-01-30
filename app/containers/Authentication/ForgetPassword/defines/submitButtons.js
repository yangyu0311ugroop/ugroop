/**
 * Created by Yang on 5/4/17.
 */

import React from 'react';
import { FormattedMessage as M } from 'react-intl';
import m from './messages';

export const VALID_BUTTON = {
  text: <M {...m.validButton} />,
  icon: '',
  type: 'submit',
};
export const VALID_RESET_BUTTON = {
  text: <M {...m.validResetButton} />,
  icon: '',
  type: 'submit',
};

export const SENDING_BUTTON = {
  text: <M {...m.sendingButton} />,
  icon: '',
  type: 'button',
};

export const REQUIRED_BUTTON = {
  text: <M {...m.validButton} />,
  icon: '',
  type: 'button',
  disabled: true,
};
export const INVALID_BUTTON = {
  text: <M {...m.validButton} />,
  icon: '',
  type: 'button',
  disabled: true,
};
export const SAME_PWD_ERROR_BUTTON = {
  text: <M {...m.samePasswordErr} />,
  icon: '',
  type: 'button',
  disabled: true,
};
