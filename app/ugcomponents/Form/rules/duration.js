/**
 * Created by stephenkarpinskyj on 3/4/18.
 */

import timestring from 'timestring';

export const isDuration = (_, value) => {
  if (!value || !value.length) {
    return true;
  }

  try {
    const time = timestring(value);
    return !!time && time < 31557600000; // 1000 years
  } catch (error) {
    return false;
  }
};

export const isDurationPositive = (_, value) => {
  if (!isDuration(_, value)) {
    return false;
  }

  if (!value || !value.length) {
    return true;
  }

  return value.trim().charAt(0) !== '-';
};

export default {
  isDuration,
  isDurationPositive,
};
