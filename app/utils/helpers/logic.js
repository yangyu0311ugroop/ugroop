import { every, some } from 'lodash';
import { pluralizeText } from 'utils/stringAdditions';

const ifElse = (conditions, conditionTrue, conditionFalse, or) => {
  if (!Array.isArray(conditions)) {
    return ifElse([conditions], conditionTrue, conditionFalse);
  }

  const predicate = or ? some : every;

  return predicate(conditions, Boolean) ? conditionTrue : conditionFalse;
};

/**
 * @param func
 * @param params array of parameter, pass in [] if none
 * @param conditionFalse
 * @returns {*}
 */
const ifFunction = (func, params = [], conditionFalse) =>
  typeof func === 'function' ? func(...params) : conditionFalse;

// if undefined, call default function
// else if function, call it, otherwise return value
const switchCase = (value, { default: defaultFn, [value]: fn } = {}) =>
  ifElse(
    typeof fn === 'undefined',
    ifFunction(defaultFn, [], defaultFn),
    ifFunction(fn, [], fn),
  );

const renderFileSize = size => {
  if (!size) return null;

  const ONE_MB = 1000000;

  if (size < ONE_MB) {
    return `${Math.round(size / 1000)} KB`;
  }

  const sizeMB = size / ONE_MB;

  // round up to 1 decimal place
  return `${Math.round(sizeMB * 10) / 10} MB`;
};

export const LOGIC_HELPERS = {
  ifElse,
  ifFunction,
  pluralise: pluralizeText,
  switchCase,
  renderFileSize,
};
