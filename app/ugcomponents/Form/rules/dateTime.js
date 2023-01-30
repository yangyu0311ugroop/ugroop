/**
 * Created by stephenkarpinskyj on 17/4/18.
 */

import moment from 'moment';
import { INPUT_UTILS } from 'ugcomponents/Inputs';

export const isDate = (_, value) => !value || moment.utc(value).isValid();

export const minDate = (_, value, min) => {
  if (!value || !min) return true;
  const minMoment = moment.utc(min);
  const m = moment.utc(value);
  return (
    !m.isValid() ||
    !minMoment.isValid() ||
    minMoment.startOf('d').isSameOrBefore(m.clone().startOf('d'))
  );
};

export const maxDate = (_, value, max) => {
  if (!value || !max) return true;
  const maxMoment = moment.utc(max);
  const m = moment.utc(value);
  return (
    !m.isValid() ||
    !maxMoment.isValid() ||
    maxMoment.startOf('d').isSameOrAfter(m.clone().startOf('d'))
  );
};

export const isTime = (_, value) =>
  !value || INPUT_UTILS.parseTime(value).isValid();

export const minTimeField = (values, value, params) => {
  if (!value) return true;

  let otherTimeName = params;

  if (Array.isArray(params)) {
    otherTimeName = params[0];
    const endTempDayName = params[1];

    const otherTempDay = values[endTempDayName];

    // always valid if not on same day
    if (otherTempDay && otherTempDay !== 'P0D') return true;
  }

  const otherValue = values[otherTimeName];

  if (!otherValue) return true;

  const m = INPUT_UTILS.parseTime(value);
  const otherM = INPUT_UTILS.parseTime(otherValue);

  return !m.isValid() || !otherM.isValid() || otherM.isSameOrBefore(m);
};

export const maxTimeField = (values, value, otherTimeFieldName) => {
  if (!value) return true;
  const otherValue = values[otherTimeFieldName];
  if (!otherValue) return true;
  const m = INPUT_UTILS.parseTime(value);
  const otherM = INPUT_UTILS.parseTime(otherValue);
  return !m.isValid() || !otherM.isValid() || otherM.isSameOrAfter(m);
};

export default {
  isDate,
  minDate,
  isTime,
  minTimeField,
  maxTimeField,
  maxDate,
};
