/**
 * Created by quando on 10/8/17.
 */

import React from 'react';
import { FormattedMessage as M } from 'react-intl';
import m from './messages';

const TITLE = {
  autoFocus: true,
  required: true,
  name: 'content',
  validations: {
    maxLength: 100,
  },
  validationErrors: {
    maxLength: <M {...m.titleMaxLength} />,
  },
};

const DESCRIPTION = {
  required: true,
  multiline: true,
  name: 'description',
  rowsMax: 4,
  rows: 1,
};

const DISPLAY_DATE = {
  name: 'displayDate',
  defaultValue: 'none',
  options: {
    none: "I'm not sure yet",
    weekDay: 'I know the day of week',
    startDate: 'I know the exact date',
  },
};

const DURATION = {
  name: 'duration',
  type: 'number',
  value: '7',
  validations: 'isLessThanOrEqual:50,isGreaterThanOrEqual:1',
  validationErrors: {
    isLessThanOrEqual: <M {...m.durationLessThanError} />,
    isGreaterThanOrEqual: <M {...m.durationGreaterThanError} />,
  },
  InputProps: {
    inputProps: { min: '0' },
  },
};

const DATE_PICKER = {
  required: true,
  name: 'startDate',
  type: 'date',
  InputLabelProps: { shrink: true },
  validations: 'isAfter',
  validationErrors: {
    isAfter: <M {...m.dateAfterError} />,
  },
};

export default {
  TITLE,
  DESCRIPTION,
  DISPLAY_DATE,
  DURATION,
  DATE_PICKER,
};
