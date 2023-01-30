import React from 'react';
import { FormattedMessage as M } from 'react-intl';
import m from './messages';

const ROOM_COUNT = {
  required: true,
  name: 'roomCount',
  type: 'number',
  value: '1',
  validations: 'isLessThanOrEqual:10,isGreaterThanOrEqual:1',
  validationErrors: {
    isLessThanOrEqual: <M {...m.roomCountLessThanError} />,
    isGreaterThanOrEqual: <M {...m.roomCountGreaterThanError} />,
  },
  InputProps: {
    inputProps: { min: '0' },
  },
};

const GUEST_COUNT = {
  required: true,
  name: 'guestCount',
  type: 'number',
  // value: '1',
  label: 'Room capacity?',
  placeholder: 'Room capacity',
  validations: 'isLessThanOrEqual:50,isGreaterThanOrEqual:1',
  validationErrors: {
    isLessThanOrEqual: <M {...m.guestCountLessThanError} />,
    isGreaterThanOrEqual: <M {...m.guestCountGreaterThanError} />,
  },
  InputProps: {
    inputProps: { min: '0' },
  },
};

const BED_COUNT = {
  required: true,
  name: 'bedCount',
  type: 'number',
  value: '1',
  label: 'No. of Beds?',
  placeholder: 'No. of Beds',
  validations: 'isLessThanOrEqual:50,isGreaterThanOrEqual:1',
  validationErrors: {
    isLessThanOrEqual: <M {...m.bedCountLessThanError} />,
    isGreaterThanOrEqual: <M {...m.bedCountGreaterThanError} />,
  },
  InputProps: {
    inputProps: { min: '0' },
  },
};

const TITLE = {
  type: 'text',
  id: 'content',
  name: 'content',
  label: 'What is the room no.?',
  placeholder: 'Room number',
  validations: {
    maxLength: 100,
  },
  validationErrors: {
    maxLength: <M {...m.titleMaxLength} />,
  },
};

const ROOM_TYPE_OTHERS = {
  autoFocus: true,
  required: true,
  type: 'text',
  id: 'otherRoomType',
  name: 'otherRoomType',
  // label: 'What is the room no.?',
  placeholder: 'Please specify room the type',
  validations: {
    maxLength: 100,
  },
  validationErrors: {
    maxLength: <M {...m.titleMaxLength} />,
  },
};
const DESCRIPTION = {
  name: 'description',
  value: '',
  placeholder: 'i.e. Twin, Double (optional)',
  lines: 2,
};

export default {
  TITLE,
  DESCRIPTION,
  ROOM_COUNT,
  ROOM_TYPE_OTHERS,
  GUEST_COUNT,
  BED_COUNT,
};
