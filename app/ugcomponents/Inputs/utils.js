/**
 * Created by stephenkarpinskyj on 7/8/18.
 */

import moment from 'moment';
import { ARRAY_HELPERS } from 'utils/helpers/arrays';
import constants from './constants';

const parseDate = value =>
  moment.utc(value, constants.DATE_INPUT_FORMATS, true);

const parseTime = value =>
  moment.utc(value, constants.TIME_INPUT_FORMATS, true);

const parseNumber = value => Number.parseInt(value, 10);

/**
 * Converts a store path array (eg. ['store, 'path'])
 * to a dot-separated input name (eg. 'store.path').
 */
const storePathToInputName = path => {
  const pathArray = ARRAY_HELPERS.arrayIfNot(path);
  return pathArray.reduce((name, p) => {
    if (!name) return p;
    return `${name}.${p}`;
  }, '');
};

export default {
  parseDate,
  parseTime,
  parseNumber,
  storePathToInputName,
};
