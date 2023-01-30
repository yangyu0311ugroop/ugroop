import React from 'react';
import { FormattedMessage as M } from 'react-intl';
import {
  PARTICIPANT_STATUSES,
  PARTICIPANT_STATUSES_REQUIRED,
} from 'utils/constants/nodes';
import m from './messages';

const getMessage = value => m[value];

const renderValue = value => {
  const message = getMessage(value);
  if (message) return <M {...message} />;
  return null;
};

const makeOptions = required => {
  const participantStatuses = required
    ? PARTICIPANT_STATUSES_REQUIRED
    : PARTICIPANT_STATUSES;
  const participantStatusArray = Object.values(participantStatuses);

  return participantStatusArray.map(value => ({
    value,
    children: renderValue(value),
  }));
};

export default {
  getMessage,
  renderValue,
  makeOptions,
};
