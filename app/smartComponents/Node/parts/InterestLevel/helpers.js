import React from 'react';
import { FormattedMessage as M } from 'react-intl';
import { NOT_APPLICABLE } from 'appConstants';
import { INTEREST_LEVELS } from './constants';
import m from './messages';

const getMessage = value => m[value];

const renderValue = value => {
  const message = getMessage(value);
  if (message) return <M {...message} />;
  return null;
};

const makeOptions = required => {
  const interestLevels = Object.values(INTEREST_LEVELS);

  if (!required) {
    interestLevels.unshift(NOT_APPLICABLE);
  }

  return interestLevels.map(value => ({
    value,
    children: renderValue(value),
  }));
};

export default {
  getMessage,
  renderValue,
  makeOptions,
};
