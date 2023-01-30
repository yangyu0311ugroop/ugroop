import { EMPTY_RTE } from 'appConstants';

export const isEmptyRTE = str => {
  // return true if string is undefined
  if (!str || str === '') return true;

  // to avoid entering empty space only
  const trimmed = str.replace(/<p>\s+<\/p>/g, '');

  // removed all instance of EMPTY_RTE
  // return true if empty string, false if not
  return !trimmed.replace(new RegExp(EMPTY_RTE, 'g'), '');
};
