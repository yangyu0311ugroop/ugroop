import React from 'react';
import { FormattedMessage as M } from 'react-intl';
import { PERSON_TYPES } from 'smartComponents/Node/parts/PersonType/constants';
import m from './messages';

const getMessage = value => m[value];

const renderValue = value => {
  const values = Object.keys(m);
  const includesValue = values.includes(value);
  if (includesValue) {
    const message = getMessage(value);
    if (message) return <M {...message} />;
  }

  return 'Other';
};

const renderOtherValue = value => value;

const makeOptions = () =>
  Object.values(PERSON_TYPES).map(value => ({
    value,
    children: renderValue(value),
  }));

export default {
  getMessage,
  renderValue,
  makeOptions,
  renderOtherValue,
};
