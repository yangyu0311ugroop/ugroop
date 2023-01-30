/**
 * Created by Yang on 28/10/16.
 */
import _ from 'lodash';
import pluralize from 'pluralize';
import { ChatTypes } from '../lib/streamChat/chatType';

export function isEmptyString(str) {
  return !str || str.length === 0;
}

export function toLowerCaseIfString(data) {
  // If data is a string, then lowercase the data and return the result.
  // Otherwise, return the original data.
  if (data && typeof data === 'string') {
    return _.toLower(data);
  }

  return data;
}

export function truncateAndToLowerCase(str, patterns, maxlength) {
  const newStr = _.truncate(_.replace(str, patterns, ''), {
    length: maxlength,
    omission: '',
  });
  return _.toLower(newStr);
}

export const capitalizeFirstLetter = str =>
  `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

export const removeWhitespace = str => (str ? str.replace(/\s+/g, '') : str);

/**
 * Pluralize the given text passed to it
 * @param {string} text
 * @param {number} count
 * @param {boolean} defaultToPlural Whether count <1 should return pluralized text or empty string
 * @return {string}
 */
export function pluralizeText(text, count, defaultToPlural = false) {
  if (!defaultToPlural && count < 1) return '';

  return pluralize(text, Math.abs(count));
}

/**
 * Count the number of decimal places in a number string.
 */
export function countDecimals(text) {
  const split = text ? text.split('.') : null;
  const decimals = split && split.length > 0 ? split[1] : null;
  return decimals ? decimals.length : 0;
}

/**
 * Capitalizes first character of multiple words within a string.
 */
export const capitalizeWords = text =>
  _.words(text).reduce((acc, word) => {
    const capitalized = _.capitalize(word);
    return acc ? `${acc} ${capitalized}` : capitalized;
  }, null);

export const renderName = (
  { firstName, middleName, lastName },
  defaultValue = '?',
) => {
  const firstMiddleName = `${firstName || ''}${
    firstName && middleName ? ' ' : ''
  }${middleName || ''}`;

  if (firstMiddleName) {
    return `${firstMiddleName}${
      firstMiddleName && lastName ? ' ' : ''
    }${lastName || ''}`;
  }

  return lastName || defaultValue;
};

// StreamChat ID only allows a-zA-Z0-9 AND @ _ -
export const toConformStreamChatId = name =>
  _.replace(name, /((?![a-zA-Z0-9@_-]))./g, '-');

export const getChatStreamId = (email, id) =>
  toConformStreamChatId(`${email}_${id}`);

export const getUGroopUserId = streamChatId => {
  const segments = _.split(streamChatId, '_');
  if (segments.length > 0) {
    const index = segments.length - 1;
    return parseInt(segments[index], 10);
  }
  return null;
};

export const getTourId = (type, channelId) => {
  if (type !== ChatTypes.UGroop) return null;
  const segments = _.split(channelId, '_');
  if (segments.length > 0) {
    const index = segments.length - 1;
    return parseInt(segments[index], 10);
  }
  return null;
};

export const parseStringJson = data => {
  const result = data != null && !isEmptyString(data) ? JSON.parse(data) : {};
  return result;
};

export const STRING_HELPERS = {
  pluralise: pluralizeText,
};

export const STRING_ADDITIONS = {
  isEmptyString,
  truncateAndToLowerCase,
  removeWhitespace,
  pluralizeText,
  countDecimals,
  capitalizeWords,
  renderName,
  capitalizeFirstLetter,
  parseStringJson,
};

export default STRING_ADDITIONS;
