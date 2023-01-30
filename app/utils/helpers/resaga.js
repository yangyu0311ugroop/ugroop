import { get } from 'lodash';
import { LOGIC_HELPERS } from './logic';

const getIfNotGiven = propName => (storeValue, props) =>
  get(props, propName, storeValue);

const getIfNot = (storeValue, propValue) =>
  LOGIC_HELPERS.ifElse(propValue !== undefined, propValue, storeValue);

export const GETTER_HELPERS = {
  getIfNotGiven,
  getIfNot,
};

const subscribeSelectorIfNotGiven = (selector, propName) => ({
  ...selector,
  getter: GETTER_HELPERS.getIfNotGiven(propName),
});

const subscribeIfNotGiven = (keyPath, propName) => ({
  keyPath,
  props: ({ [propName]: propValue }) => propValue,
  getter: GETTER_HELPERS.getIfNot,
});

const mapToId = (selector, idName) => param => selector({ id: param[idName] });

const toggleValue = value => !value;
const prop = propName => ({ [propName]: p }) => p;
const concat = value => (array = []) =>
  array.indexOf(value) === -1 ? array.concat(value) : array;

export const RESAGA_HELPERS = {
  subscribeIfNotGiven,
  subscribeSelectorIfNotGiven,
  mapToId,
  toggleValue,
  prop,
  concat,
};
